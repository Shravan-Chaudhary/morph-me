package main

import (
	"context"
	"log"
	"log/slog"
	"morph-me/internal/database"
	"morph-me/internal/http/handler"
	"morph-me/internal/http/respository"
	"morph-me/internal/http/service"
	storage "morph-me/internal/object-storage"
	"morph-me/internal/server"
	"morph-me/internal/util"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
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

	// Router
	router := gin.Default()
	corsconfig := cors.DefaultConfig()
	corsconfig.AllowOrigins = []string{"http://localhost:3000"}
	corsconfig.AllowMethods = []string{"GET", "POST", "OPTIONS"}
	corsconfig.AllowHeaders = []string{
		"Origin",
		"Content-Type",
		"Accept",
		"Authorization",
		"Cross-Origin-Opener-Policy",
		"Cross-Origin-Embedder-Policy",
	}
	corsconfig.ExposeHeaders = []string{
		"Cross-Origin-Opener-Policy",
		"Cross-Origin-Embedder-Policy",
	}
	corsconfig.AllowCredentials = true
	corsconfig.MaxAge = 12 * time.Hour

	router.Use(cors.New(corsconfig))

	userRespository, err := respository.NewMongoUserRepository(client)
	if err != nil {
		log.Fatalf("Failed to create user repository: %s", err.Error())
	}

	s3Storage, err := storage.NewS3Storage(config.S3_BUCKET_NAME, config.S3_REGION, config.S3_ACCESS_KEY, config.S3_SECRET_KEY)
	if err != nil {
		panic(err.Error())
	}
	userService := service.NewUserService(userRespository)
	userHandler := handler.NewUserHandler()
	googleHandler := handler.NewGoogleOAuthHandler(userService, googleOauthConfig)
	morphHandler := handler.NewMorphHandler(s3Storage)


	// Routes
	router.GET("/auth/google/callback", googleHandler.GoogleCallBackHandler)
	router.POST("/users", userHandler.HandleCreateUser)
	router.POST("/morph", morphHandler.Morph)

	s := server.NewServer(":8080", router)
	s.Start()
}




