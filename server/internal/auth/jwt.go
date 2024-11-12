package auth

import (
	"morph-me/internal/http/model"
	"time"

	"github.com/dgrijalva/jwt-go"
)

func SignJWT(user *model.User) (string, error) {
	const (
		THIRTY_DAYS = 30 * 24 * time.Hour
	)
	claims := jwt.MapClaims{
		"sub":       user.ID.Hex(),
		"name":      user.Name,
		"email":     user.Email,
		"google_id": user.GoogleID,
		"iss":       "morph-me",
		"exp":       time.Now().Add(THIRTY_DAYS).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedToken, err := token.SignedString([]byte("topSecretString"))
	if err != nil {
		return "", err
	}
	return signedToken, nil
}