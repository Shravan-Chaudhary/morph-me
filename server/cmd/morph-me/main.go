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
	"morph-me/internal/http/respository"
	"morph-me/internal/http/service"
	storage "morph-me/internal/object-storage"
	"morph-me/internal/server"
	"morph-me/internal/util"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/replicate/replicate-go"
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
		ClientID: config.ClientID,
		ClientSecret: config.ClientSecret,
		RedirectURL: config.RedirectURL,
		Scopes: []string{"profile", "email"},
		Endpoint: google.Endpoint,
	}
}

func main() {
	// Load env
	config, err := util.LoadConfig()
	if err != nil {
		log.Fatal("Error loading config", err)
	}

	// Connect to MongoDB
	client, err := database.ConnectMongoDB(config.DatabaseURI)
	defer client.Disconnect(context.Background())
	if err != nil {
		log.Fatalf("Failed to connect to MongoDB: %s", err.Error())
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
corsconfig.AllowOrigins = []string{"http://localhost:3000", "http://localhost:5173"}
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
corsconfig.MaxAge = 12 * time.Hour
router.Use(cors.New(corsconfig))

	// Instances
	userRespository, err := respository.NewMongoUserRepository(client)
	if err != nil {
		log.Fatalf("Failed to create user repository: %s", err.Error())
	}

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
	router.GET("/predictions/:prediction_id", func (c *gin.Context) {
		GetPredictionStatus(c, &config)
	})
	router.POST("/predictions", func(c *gin.Context) {
		Prediction(c, r8)
	})

	s := server.NewServer(":8080", router)
	s.Start()
}
	type ProcessRequest struct {
    	ImageUrl string  `json:"image_url" binding:"required"`
    	Style    string  `json:"style" binding:"required"`
	}
func Prediction (c *gin.Context, r8 *replicate.Client) {
		var req ProcessRequest
        if err := c.ShouldBindJSON(&req); err != nil {
            c.JSON(400, gin.H{"error": err.Error()})
            return
        }

		input := replicate.PredictionInput{
            "image":              req.ImageUrl,
            "style":             req.Style,
            "prompt":            "person",
            "negative_prompt":    "boring",
            "prompt_strength":    4.5,
            "denoising_strength": 1,
            "instant_id_strength": 0.8,
        }
	 // Run the model and wait for output
	//  version := "fofr/face-to-many:a07f252abbbd832009640b27f063ea52d87d7a23a185ca165bec23b5adc8deaf"
        prediction, err := r8.CreatePrediction(c.Request.Context(), "a07f252abbbd832009640b27f063ea52d87d7a23a185ca165bec23b5adc8deaf", input,nil, false) // nil webhook since we're waiting
        if err != nil {
            c.JSON(500, gin.H{
                "error": "Processing failed",
                "details": err.Error(),
            })
            return
        }
		fmt.Println(prediction.ID)

        // Return the processed image URLs
        c.JSON(200, gin.H{
            "status": "success",
            "prediction_id": prediction.ID,
        })
	}

func GetPredictionStatus(c *gin.Context, config *util.Config) {
    url := "https://api.replicate.com/v1/predictions/" + c.Param("prediction_id")
    req, err := http.NewRequest("GET", url, nil)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
	req.Header.Set("Authorization", "Token " + config.REPLICATE_TOKEN)

    resp, err := http.DefaultClient.Do(req)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    defer resp.Body.Close()

    body, err := io.ReadAll(resp.Body)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.Writer.Header().Set("Content-Type", "application/json")
    c.Writer.WriteHeader(resp.StatusCode)
    c.Writer.Write(body)
}

// TODO: Implement credit checkig system
