package respository

import (
	"context"
	"fmt"
	"morph-me/internal/http/model"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type UserRespository interface {
	CreateUser(ctx context.Context, userData *model.User)  error
	FindUserByEmail(ctx context.Context, email string) (*model.User, error)
}

type MongoUserRespository struct{
	client *mongo.Client
	coll *mongo.Collection
}

func NewMongoUserRepository(client *mongo.Client) (*MongoUserRespository, error) {
    coll := client.Database("revamp_dev").Collection("users")

    // Create unique index on email field
    _, err := coll.Indexes().CreateOne(
        context.Background(),
        mongo.IndexModel{
            Keys:    bson.D{{Key: "email", Value: 1}},
            Options: options.Index().SetUnique(true),
        },
    )
    if err != nil {
        return nil, fmt.Errorf("failed to create email index: %w", err)
    }
	return &MongoUserRespository{
		client: client,
		// index on the email field to ensure email uniqueness
		coll: coll,
	}, nil
}

func (r *MongoUserRespository) CreateUser(ctx context.Context, user *model.User)  error {
	_, err :=  r.coll.InsertOne(ctx, user)
	return err
}

func (r *MongoUserRespository) FindUserByEmail(ctx context.Context, email string) (*model.User, error) {
	 user :=&model.User{}
 		 err := r.coll.FindOne(ctx, bson.M{"email": email}).Decode(user)
		 if err != nil {
			 return nil, err
		 }
	 return user, nil
}