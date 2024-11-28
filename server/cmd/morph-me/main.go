package main

import (
	"context"
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
	"os"
	"time"

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

	if config.NODE_ENV == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	// Router
	router := gin.Default()
	router.Use(util.SetupCORS(config))

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
	predicitonHandler := handler.NewPredictionHandler(r8, creditRepository, &config)
	googleHandler := handler.NewGoogleOAuthHandler(userService, googleOauthConfig, config.JWT_SECRET)
	uploadHandler := handler.NewUploadHandler(s3Storage)

	// Routes
	router.GET("/auth/google/callback", googleHandler.GoogleCallBackHandler)
	router.POST("/users", userHandler.HandleCreateUser)
	router.POST("/upload", uploadHandler.Upload)
	router.GET("/self", authMiddleware, userHandler.Self)
	router.POST("/predictions", authMiddleware, predicitonHandler.PredictionHandler)
	router.GET("/predictions/:prediction_id", authMiddleware, predicitonHandler.GetPredictionStatusHandler)
	router.GET("/remaining-credits", authMiddleware, userHandler.RemainingCredits)

	s := server.NewServer(":8080", router)
	s.Start()
}

// 1. Check for file type
// 2. Session endpoint
// 3. Self endpoint
// 4. Stuctured logging and store logs
// 5. Remove fmt's
// 6. Production Dockerfile
// 7. Check for secrets in code replace with env vars

// Frontend
// 1. Type of photo to upload
// 2. Example prompts
// 3. Check for file type before uploading

// Production
// 3. Production Database
