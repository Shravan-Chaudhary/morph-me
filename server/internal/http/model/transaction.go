package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Transaction struct {
	ID           primitive.ObjectID `bson:"_id"`
	UserID       primitive.ObjectID `bson:"user_id"`
	Type         string             `bson:"type"`   // "DEDUCT" for predictions
	Amount       int                `bson:"amount"` // Always 1 for predictions
	Status       string             `bson:"status"` // PENDING -> COMPLETED/FAILED
	PredictionID string             `bson:"prediction_id"`
	CreatedAt    time.Time          `bson:"created_at"`
}