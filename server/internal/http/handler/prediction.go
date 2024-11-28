package handler

import (
	"fmt"
	"io"
	"morph-me/internal/http/model"
	"morph-me/internal/http/respository"
	"morph-me/internal/util"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/replicate/replicate-go"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type ProcessRequest struct {
	ImageUrl string `json:"image_url" binding:"required"`
	Style    string `json:"style" binding:"required"`
	Prompt   string `json:"prompt"`
}

type PredictionHandler struct {
	r8         *replicate.Client
	creditRepo *respository.CreditRepository
	config     *util.Config
}

func NewPredictionHandler(r8 *replicate.Client, creditRepo *respository.CreditRepository, config *util.Config) *PredictionHandler {
	return &PredictionHandler{
		r8:         r8,
		creditRepo: creditRepo,
		config:     config,
	}
}

func (h *PredictionHandler) PredictionHandler(c *gin.Context) {
	// Get UserID
	userIDStr := c.MustGet("userID").(string)
	userID, err := primitive.ObjectIDFromHex(userIDStr)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error(), "status": "error"})
		return
	}

	// MongodB Transaction
	session, err := h.creditRepo.Client.StartSession()
	if err != nil {
		fmt.Println("session creation", err)
		c.JSON(500, gin.H{"error": "Internal server error", "status": "error"})
		return
	}
	defer session.EndSession(c.Request.Context())

	var prediction *replicate.Prediction
	var tx *model.Transaction

	// The whole show wrapped in withTransaction
	_, err = session.WithTransaction(c.Request.Context(), func(sessCtx mongo.SessionContext) (interface{}, error) {
		// 1.Create first paper trail
		tx = &model.Transaction{
			ID:        primitive.NewObjectID(),
			UserID:    userID,
			Type:      "DEDUCT",
			Amount:    1,
			Status:    "PENDING",
			CreatedAt: time.Now(),
		}
		if err := h.creditRepo.CreateTransaction(sessCtx, tx); err != nil {
			fmt.Println("transaction creation", err)
			return nil, fmt.Errorf("failed to create Transaction: %v", err)
		}

		// 2. Yoink the credit (atomically)
		if err := h.creditRepo.DeductUserCredit(sessCtx, userID); err != nil {
			fmt.Println("deducting credit", err)
			return nil, fmt.Errorf("insufficient credits")
		}

		// 3. Create the prediction
		var req ProcessRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			fmt.Println("binding request", err)
			return nil, err
		}
		if req.Prompt == "" {
			req.Prompt = "a person"
		}
		fmt.Println(req.ImageUrl, req.Style, req.Prompt)

		input := replicate.PredictionInput{
			"image":               req.ImageUrl,
			"style":               req.Style,
			"prompt":              req.Prompt,
			"negative_prompt":     "boring",
			"prompt_strength":     4.5,
			"denoising_strength":  1,
			"instant_id_strength": 0.8,
		}
		// Run the model and wait for output
		version := "a07f252abbbd832009640b27f063ea52d87d7a23a185ca165bec23b5adc8deaf"
		prediction, err = h.r8.CreatePrediction(c.Request.Context(), version, input, nil, false) // nil webhook since we're waiting
		if err != nil {
			fmt.Println("creating prediction", err)
			return nil, fmt.Errorf("failed to create prediction: %v", err)
		}
		fmt.Println(prediction.ID)

		// 4. Update paper trail
		if err = h.creditRepo.UpdateTransactionStatus(sessCtx, tx.ID, "COMPLETED", prediction.ID); err != nil {
			fmt.Println("updating transaction status", err)
			return nil, fmt.Errorf("failed to update transaction status: %v", err)
		}
		return prediction.ID, nil
	})

	if err != nil {
		if tx != nil {
			h.creditRepo.UpdateTransactionStatus(c.Request.Context(), tx.ID, "FAILED", "")
		}
		fmt.Println("transaction error", err)
		c.JSON(500, gin.H{"status": "error", "error": err.Error()})
		return
	}

	// Return the processed image URLs
	c.JSON(200, gin.H{
		"status":        "success",
		"prediction_id": prediction.ID,
	})
}

// GetPredictionStatusHandler handler
func GetPredictionStatusHandler(c *gin.Context, config *util.Config) {
	url := "https://api.replicate.com/v1/predictions/" + c.Param("prediction_id")
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "status": "error"})
		return
	}
	req.Header.Set("Authorization", "Token "+config.REPLICATE_TOKEN)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "status": "error"})
		return
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "status": "error"})
		return
	}

	c.Writer.Header().Set("Content-Type", "application/json")
	c.Writer.WriteHeader(resp.StatusCode)
	c.Writer.Write(body)
}

func (h *PredictionHandler) GetPredictionStatusHandler(c *gin.Context) {
	url := "https://api.replicate.com/v1/predictions/" + c.Param("prediction_id")
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "status": "error"})
		return
	}
	req.Header.Set("Authorization", "Token "+h.config.REPLICATE_TOKEN)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "status": "error"})
		return
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "status": "error"})
		return
	}

	c.Writer.Header().Set("Content-Type", "application/json")
	c.Writer.WriteHeader(resp.StatusCode)
	c.Writer.Write(body)

}
