package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserHandler struct{}

func NewUserHandler() *UserHandler {
	return &UserHandler{}
}

func (h *UserHandler) HandleCreateUser(c *gin.Context) {
	var user struct {
		Name  string `json:"name"`
		Email string `json:"email"`
	}
	c.JSON(http.StatusOK, user)
}

// TODO: Implement GetProfile method
