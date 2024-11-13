package handler

import (
	"fmt"
	storage "morph-me/internal/object-storage"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UploadHandler struct{
	storage storage.Storage
}

func NewUploadHandler(storage storage.Storage) *UploadHandler {
	return &UploadHandler{
		storage: storage,
	}
}

func (h *UploadHandler) Upload(c *gin.Context) {
    // Handle the file upload
    file, err := c.FormFile("file")
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{
            "message": "file not found",
            "error":   err.Error(),
        })
        return
    }

	//TODO: Validate file type
	// TODO: File type validation png, jpg, jpeg
	// UPload to storage
   fileURL, err := h.storage.UploadFile(file)
   if err != nil {
         c.JSON(http.StatusInternalServerError, gin.H{
            "message": "error uploading file to S3",
            "error":   err.Error(),
        })
        return
   }
	c.JSON(http.StatusCreated, gin.H{
        "message": fmt.Sprintf("'%s' uploaded successfully!", file.Filename),
        "fileUrl": fileURL,
    })
}