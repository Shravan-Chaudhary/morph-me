package handler

import (
	"context"
	"fmt"
	"morph-me/internal/auth"
	"morph-me/internal/http/service"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
)

type GoogleOAuthHandler struct {
	userService *service.UserService
	googleOauthConfig *oauth2.Config
	jwtSecret string
}

func NewGoogleOAuthHandler(userService *service.UserService, googleOauthConfig *oauth2.Config, jwtSecret string) *GoogleOAuthHandler {
	return &GoogleOAuthHandler{
		userService: userService,
		googleOauthConfig: googleOauthConfig,
		jwtSecret: jwtSecret,
	}
}


func (h *GoogleOAuthHandler) GoogleCallBackHandler(c *gin.Context) {
	code := c.Query("code")

	token, err := h.googleOauthConfig.Exchange(context.Background(), code)
	if err != nil {
		fmt.Println("Error exchanging code", err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userInfo, err := auth.GetUserInfo(token.AccessToken)
	if err != nil {
		fmt.Println("Error getting user info", err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create or update user
	user, err := h.userService.CreateOrUpdateUser(c.Request.Context(), userInfo)
	if err != nil {
		fmt.Println("Error creating or updating user", err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	signedToken, err := auth.SignJWT(h.jwtSecret, user)
	if err != nil {
		fmt.Println("Error signing JWT", err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// TODO: Set JWT as HttpOnly cookie
	c.SetCookie(
		"accessToken",
		signedToken,
		2592000, //  MaxAge (30 days)
		"/", // Path
		"", // Domain
		true, // Secure
		true, // HttpOnly
	)
	// TODO: Redirect to frontend
	c.JSON(http.StatusOK, gin.H{"token": signedToken, "user": user})
}