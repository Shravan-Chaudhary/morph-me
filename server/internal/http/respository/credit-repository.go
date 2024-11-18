package respository

import (
	"context"
	"fmt"
	"morph-me/internal/http/model"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

const (
	TRANSACTIONS = "transactions"
	USERS        = "users"
)

type CreditRepository struct {
	Client *mongo.Client
	db     *mongo.Database
}

func NewCreditRepository(client *mongo.Client, dbName string) *CreditRepository {
	return &CreditRepository{
		Client: client,
		db:     client.Database(dbName),
	}
}

// Creating paper trail
func (r *CreditRepository) CreateTransaction(ctx context.Context, tx *model.Transaction) error {
	_, err := r.db.Collection(TRANSACTIONS).InsertOne(ctx, tx)
	return err
}

// Atomic Yoink Operation
func (r *CreditRepository) DeductUserCredit(ctx context.Context, userID primitive.ObjectID) error {
	result, err := r.db.Collection(USERS).UpdateOne(
		ctx,
		bson.M{
			"_id":     userID,
			"credits": bson.M{"$gt": 0}, // Atomic check for credits > 0
		},
		bson.M{"$inc": bson.M{"credits": -1}},
	)

	if err != nil {
		return err
	}

	// No credits? No prediction
	if result.ModifiedCount == 0 {
		return fmt.Errorf("insufficient credits")
	}
	return nil
}

// Updation paper trail
func (r *CreditRepository) UpdateTransactionStatus(ctx context.Context, txID primitive.ObjectID, status string, predictionID string) error {
	update := bson.M{"status": status}
	if predictionID != "" {
		update["prediction_id"] = predictionID
	}
	_, err := r.db.Collection(TRANSACTIONS).UpdateOne(
		ctx,
		bson.M{"_id": txID},
		bson.M{"$set": update},
	)
	return err
}
