package util

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupCORS(config Config) gin.HandlerFunc {
	corsConfig := cors.Config{
		AllowOrigins:     []string{config.CLIENT_URL, "https://morph-me.vercel.app", "http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"},
		AllowCredentials: true,
		MaxAge:           2 * time.Hour, // Chrome's maximum supported duration
		AllowHeaders: []string{
			"Origin", "Content-Type", "Accept", "Authorization",
			"Cross-Origin-Opener-Policy", "Cross-Origin-Embedder-Policy",
			"Cookie", "Set-Cookie",
		},
		ExposeHeaders: []string{
			"Cross-Origin-Opener-Policy",
			"Cross-Origin-Embedder-Policy",
			"Set-Cookie",
		},
	}
	return cors.New(corsConfig)
}
