package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID 			  primitive.ObjectID `json:"id" bson:"_id"`
	Name          string             `bson:"name"`
	Email         string             `bson:"email"`
	GoogleID      string             `bson:"google_id"`
	Credits 	  int   			 `bson:"credits"`
	CreatedAt     time.Time          `bson:"created_at"`
	LastLogin     time.Time          `bson:"last_login"`
}