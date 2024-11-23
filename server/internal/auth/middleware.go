package auth

import (
	"fmt"
	"log/slog"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func AuthMiddleware(jwtSecret string) gin.HandlerFunc {
	return func(c *gin.Context) {
		//  Get the cookie set by Next.js
		var token string
		token, err := c.Cookie("accessToken")
		slog.Debug("debug ", slog.String("token", token))
		fmt.Println("token", token)
		if err != nil {
			slog.Debug("Error getting accesstoken from cookie", err)
			fmt.Println("Error getting accesstoken from cookie", err)
			authHeader := c.GetHeader("Authorization")
			if authHeader == "" {
				c.JSON(http.StatusUnauthorized, gin.H{
					"error": "No authorization header found",
				})
				c.Abort()
				return
			}
			// Check if it's a Bearer token
			const prefix = "Bearer "
			if !strings.HasPrefix(authHeader, prefix) {
				c.JSON(http.StatusUnauthorized, gin.H{
					"error": "Invalid authorization header format",
				})
				c.Abort()
				return
			}

			// Extract the token
			token = strings.TrimPrefix(authHeader, prefix)
			if token == "" {
				c.JSON(http.StatusUnauthorized, gin.H{
					"error": "Empty token",
				})
				c.Abort()
				return
			}

		}
		email, userID, err := ParseJWT(token, jwtSecret)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Invalid token",
			})
			c.Abort()
		}

		c.Set("email", email)
		c.Set("userID", userID)
		c.Next()
	}
}
