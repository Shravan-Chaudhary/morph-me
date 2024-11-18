package main

import (
	"context"
	"fmt"
	"io"
	"log"
	"log/slog"
	"morph-me/internal/auth"
	"morph-me/internal/database"
	"morph-me/internal/http/handler"
	"morph-me/internal/http/model"
	"morph-me/internal/http/respository"
	"morph-me/internal/http/service"
	storage "morph-me/internal/object-storage"
	"morph-me/internal/server"
	"morph-me/internal/util"
	"net/http"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/replicate/replicate-go"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

var googleOauthConfig = &oauth2.Config{}

func init() {
	// Load env
	config, err := util.LoadConfig()
	if err != nil {
		log.Fatal("Error loading config", err)
	}
	googleOauthConfig = &oauth2.Config{
		ClientID:     config.ClientID,
		ClientSecret: config.ClientSecret,
		RedirectURL:  config.RedirectURL,
		Scopes:       []string{"profile", "email"},
		Endpoint:     google.Endpoint,
	}
}

func main() {
	// Load env
	config, err := util.LoadConfig()
	if err != nil {
		log.Fatal("Error loading config", err)
	}

	// Connect to MongoDB
	mongoConfig := database.ConnectionConfig{
		URI:            config.DatabaseURI,
		MaxPoolSize:    30,
		MinPoolSize:    10,
		MaxIdleTime:    1 * time.Minute,
		ConnectTimeout: 10 * time.Second,
		RetryAttempts:  5,
		RetryInterval:  3 * time.Second,
	}
	client, err := database.ConnectMongoDB(mongoConfig)
	defer client.Disconnect(context.Background())
	if err != nil {

		os.Exit(1)
	}
	slog.Info("Connected to MongoDB")

	// Replicate Client
	r8, err := replicate.NewClient(replicate.WithToken(config.REPLICATE_TOKEN))
	if err != nil {
		log.Fatalf("Failed to create Replicate client: %v", err)
	}

	// Router
	router := gin.Default()
	corsconfig := cors.DefaultConfig()
	corsconfig.AllowOrigins = []string{config.CLIENT_URL, "http://localhost:5173"}
	corsconfig.AllowMethods = []string{"GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"}
	corsconfig.AllowHeaders = []string{
		"Origin",
		"Content-Type",
		"Accept",
		"Authorization",
		"Cross-Origin-Opener-Policy",
		"Cross-Origin-Embedder-Policy",
		"Cookie",
		"Set-Cookie",
	}
	corsconfig.ExposeHeaders = []string{
		"Cross-Origin-Opener-Policy",
		"Cross-Origin-Embedder-Policy",
		"Set-Cookie",
	}
	corsconfig.AllowCredentials = true
	corsconfig.MaxAge = 24 * time.Hour
	router.Use(cors.New(corsconfig))

	// Instances
	userRespository, err := respository.NewMongoUserRepository(client, config.DATABASE_NAME)
	if err != nil {
		log.Fatalf("Failed to create user repository: %s", err.Error())
	}
	creditRepository := respository.NewCreditRepository(client, config.DATABASE_NAME)

	s3Storage, err := storage.NewS3Storage(config.S3_BUCKET_NAME, config.S3_REGION, config.S3_ACCESS_KEY, config.S3_SECRET_KEY)
	if err != nil {
		panic(err.Error())
	}
	authMiddleware := auth.AuthMiddleware(config.JWT_SECRET)
	userService := service.NewUserService(userRespository)
	userHandler := handler.NewUserHandler(userService)
	googleHandler := handler.NewGoogleOAuthHandler(userService, googleOauthConfig, config.JWT_SECRET)
	uploadHandler := handler.NewUploadHandler(s3Storage)

	// Routes
	router.GET("/auth/google/callback", googleHandler.GoogleCallBackHandler)
	router.POST("/users", userHandler.HandleCreateUser)
	router.POST("/upload", uploadHandler.Upload)
	router.GET("/self", authMiddleware, userHandler.Self)
	router.GET("/predictions/:prediction_id", authMiddleware, func(c *gin.Context) {
		GetPredictionStatus(c, &config)
	})
	router.POST("/predictions", authMiddleware, func(c *gin.Context) {
		Prediction(c, r8, creditRepository)
	})

	s := server.NewServer(":8080", router)
	s.Start()
}

type ProcessRequest struct {
	ImageUrl string `json:"image_url" binding:"required"`
	Style    string `json:"style" binding:"required"`
}

// Prediction handler
func Prediction(c *gin.Context, r8 *replicate.Client, creditRepo *respository.CreditRepository) {
	// Get UserID
	userIDStr := c.MustGet("userID").(string)
	userID, err := primitive.ObjectIDFromHex(userIDStr)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error(), "status": "error"})
		return
	}

	// MongodB Transaction
	session, err := creditRepo.Client.StartSession()
	if err != nil {
		fmt.Println("session creation", err)
		c.JSON(500, gin.H{"error": "Internal server error", "status": "error"})
		return
	}
	defer session.EndSession(c.Request.Context())

	var prediction *replicate.Prediction
	var tx *model.Transaction

	// The whole show wrapped in withTransaction
	_, err = session.WithTransaction(c.Request.Context(), func(sessCtx mongo.SessionContext) (interface{}, error) {
		// 1.Create first paper trail
		tx = &model.Transaction{
			ID:        primitive.NewObjectID(),
			UserID:    userID,
			Type:      "DEDUCT",
			Amount:    1,
			Status:    "PENDING",
			CreatedAt: time.Now(),
		}
		if err := creditRepo.CreateTransaction(sessCtx, tx); err != nil {
			fmt.Println("transaction creation", err)
			return nil, fmt.Errorf("failed to create Transaction: %v", err)
		}

		// 2. Yoink the credit (atomically)
		if err := creditRepo.DeductUserCredit(sessCtx, userID); err != nil {
			fmt.Println("deducting credit", err)
			return nil, fmt.Errorf("insufficient credits")
		}

		// 3. Create the prediction
		var req ProcessRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			fmt.Println("binding request", err)
			return nil, err
		}

		input := replicate.PredictionInput{
			"image":               req.ImageUrl,
			"style":               req.Style,
			"prompt":              "a person",
			"negative_prompt":     "boring",
			"prompt_strength":     4.5,
			"denoising_strength":  1,
			"instant_id_strength": 0.8,
		}
		// Run the model and wait for output
		version := "a07f252abbbd832009640b27f063ea52d87d7a23a185ca165bec23b5adc8deaf"
		prediction, err = r8.CreatePrediction(c.Request.Context(), version, input, nil, false) // nil webhook since we're waiting
		if err != nil {
			fmt.Println("creating prediction", err)
			return nil, fmt.Errorf("failed to create prediction: %v", err)
		}
		fmt.Println(prediction.ID)

		// 4. Update paper trail
		if err = creditRepo.UpdateTransactionStatus(sessCtx, tx.ID, "COMPLETED", prediction.ID); err != nil {
			fmt.Println("updating transaction status", err)
			return nil, fmt.Errorf("failed to update transaction status: %v", err)
		}
		return prediction.ID, nil
	})

	if err != nil {
		if tx != nil {
			creditRepo.UpdateTransactionStatus(c.Request.Context(), tx.ID, "FAILED", "")
		}
		fmt.Println("transaction error", err)
		c.JSON(500, gin.H{"status": "error", "error": err.Error()})
		return
	}

	// Return the processed image URLs
	c.JSON(200, gin.H{
		"status":        "success",
		"prediction_id": prediction.ID,
	})
}

// GetPredictionStatus handler
func GetPredictionStatus(c *gin.Context, config *util.Config) {
	url := "https://api.replicate.com/v1/predictions/" + c.Param("prediction_id")
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "status": "error"})
		return
	}
	req.Header.Set("Authorization", "Token "+config.REPLICATE_TOKEN)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "status": "error"})
		return
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "status": "error"})
		return
	}

	c.Writer.Header().Set("Content-Type", "application/json")
	c.Writer.WriteHeader(resp.StatusCode)
	c.Writer.Write(body)
}

// 1. Credits endpoint
// 2. Session endpoint
// 3. Self endpoint

// Frontend
// 1. Implement proper error message for insufficient credits
// 2. Frontend check for credits (if credits < 1, disable button)
// 3. Enable transform button after an error.
