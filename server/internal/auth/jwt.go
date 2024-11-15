package auth

import (
	"errors"
	"morph-me/internal/http/model"
	"time"

	"github.com/dgrijalva/jwt-go"
)

func SignJWT(jwtSecret string, user *model.User) (string, error) {
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
	signedToken, err := token.SignedString([]byte(jwtSecret))
	if err != nil {
		return "", err
	}
	return signedToken, nil
}

// ParseJWT parses and validates the JWT token
func ParseJWT(tokenString string, jwtSecret string) (string, error) {
	// Parse the token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("unexpected signing method")
		}
		return []byte(jwtSecret), nil
	})

	if err != nil {
		return "", err
	}

		// Check if the token is valid and extract claims
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		email, ok := claims["email"].(string)
		if !ok {
			return "", errors.New("email claim not found")
		}
		return email, nil
	}

	return "", errors.New("invalid token")
}