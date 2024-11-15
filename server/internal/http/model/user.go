package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID 			  primitive.ObjectID `json:"id" bson:"_id"`
	Name          string             `json:"name" bson:"name"`
	Email         string             `json:"email" bson:"email"`
	Role           string             `json:"role" bson:"role"`
	GoogleID      string             `json:"google_id" bson:"google_id"`
	Credits 	  int   			 `json:"credits" bson:"credits"`
	CreatedAt     time.Time          `json:"created_at" bson:"created_at"`
	LastLogin     time.Time          `json:"last_login" bson:"last_login"`
}