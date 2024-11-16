package database

import (
	"context"
	"fmt"
	"log/slog"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// ConnectionConfig holds MongoDB connection configuration
type ConnectionConfig struct {
	URI            string
	MaxPoolSize    uint64
	MinPoolSize    uint64
	MaxIdleTime    time.Duration
	ConnectTimeout time.Duration
	RetryAttempts  int
	RetryInterval  time.Duration
}

// DefaultConfig returns the default MongoDB connection configuration
func DefaultConfig() ConnectionConfig {
	return ConnectionConfig{
		MaxPoolSize:    50,
		MinPoolSize:    5,
		MaxIdleTime:    1 * time.Minute,
		ConnectTimeout: 10 * time.Second,
		RetryAttempts:  3,
		RetryInterval:  2 * time.Second,
	}
}

// ConnectMongoDB establishes a connection to MongoDB with retries
func ConnectMongoDB(cfg ConnectionConfig) (*mongo.Client, error) {
	clientOptions := options.Client().
		ApplyURI(cfg.URI).
		SetMaxPoolSize(cfg.MaxPoolSize).
		SetMinPoolSize(cfg.MinPoolSize).
		SetMaxConnIdleTime(cfg.MaxIdleTime)

		logURI := maskURI(cfg.URI)
		slog.Info("attempting to connect to MongoDB",
		"maxPoolSize", cfg.MaxPoolSize,
		"minPoolSize", cfg.MinPoolSize,
		"maxIdleTime", cfg.MaxIdleTime,
		"uri", logURI)

	// Try to connect with retries
	var client *mongo.Client
	var err error

	for attempt := 1; attempt <= cfg.RetryAttempts; attempt++ {
		ctx, cancel := context.WithTimeout(context.Background(), cfg.ConnectTimeout)

		client, err = mongo.Connect(ctx, clientOptions)
		if err == nil {
			// Test the connection
			slog.Info("successfully connected to MongoDB",
					"attempt", attempt,
					"uri", logURI,
					)
			if err = client.Ping(ctx, nil); err == nil {
				cancel()
				return client, nil
			}
		}

		cancel() // Cancel the context before retry

		slog.Warn("failed to connect to MongoDB",
			"attempt", attempt,
			"totalAttempts", cfg.RetryAttempts,
			"uri", logURI,
			"error", err,
			"nextRetryIn", cfg.RetryInterval)

		if attempt < cfg.RetryAttempts {
			time.Sleep(cfg.RetryInterval)
		}
	}

	finalErr := fmt.Errorf("failed to connect to MongoDB after %d attempts: %w", cfg.RetryAttempts, err)
	slog.Error("all MongoDB connection attempts failed",
			"totalAttempts", cfg.RetryAttempts,
			"uri", logURI,
			"error", err)
	return nil, finalErr
}

func maskURI(uri string) string {
	if len(uri) == 0 {
		return ""
	}
	// mongodb://user:pass@localhost:27017 -> mongodb://***:***@localhost:27017
	return "mongodb://****:****@" + uri[strings.LastIndex(uri, "@")+1:]
}