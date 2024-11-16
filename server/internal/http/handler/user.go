package handler

import (
	"morph-me/internal/http/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserHandler struct{
	userService *service.UserService
}

func NewUserHandler(userService *service.UserService) *UserHandler {
	return &UserHandler{
		userService: userService,
	}
}

func (h *UserHandler) HandleCreateUser(c *gin.Context) {
	var user struct {
		Name  string `json:"name"`
		Email string `json:"email"`
	}
	c.JSON(http.StatusOK, user)
}

func (h *UserHandler) Self(c *gin.Context) {
	email, exists := c.Get("email")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "no access token found"})
		return
	}
	user, err := h.userService.GetUserByEmail(c, email.(string))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "error fetching user"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"user": user})
}

