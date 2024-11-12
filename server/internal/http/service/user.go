package service

import (
	"context"
	"morph-me/internal/http/model"
	"morph-me/internal/http/respository"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserService struct {
	userRespository respository.UserRespository
}

func NewUserService (userRespository respository.UserRespository) *UserService {
	return &UserService{
		userRespository: userRespository,
	}
}

func (s *UserService) CreateOrUpdateUser(ctx context.Context,userInfo map[string]interface{}) (*model.User, error) {
	existingUser, err := s.userRespository.FindUserByEmail(ctx, userInfo["email"].(string))

	// Create user if not exists
	if err == mongo.ErrNoDocuments {
		newUser := model.User{
			ID:        primitive.NewObjectID(),
			Email:     userInfo["email"].(string),
			Name:      userInfo["name"].(string),
			Credits:   2,
			GoogleID:  userInfo["id"].(string),
			CreatedAt: time.Now(),
			LastLogin: time.Now(),
		}

		 err := s.userRespository.CreateUser(ctx, &newUser)
		if err != nil {
			return nil, err
		}

		return &newUser, nil
	}

	//TODO: Implement update user logic
	// returing existing user for now
	return existingUser, nil
}