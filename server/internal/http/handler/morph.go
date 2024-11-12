package handler

import (
	"fmt"
	storage "morph-me/internal/object-storage"
	"net/http"

	"github.com/gin-gonic/gin"
)

type MorphHandler struct {
    storage storage.Storage
}

type MorphRequest struct {
	Name string `form:"name"`
	Style string `form:"style"`
}

func NewMorphHandler(storage storage.Storage) *MorphHandler {
	return &MorphHandler{
        storage: storage,
    }
}

func (h *MorphHandler) Morph(c *gin.Context) {
	  // Parse the JSON data
    var req MorphRequest
    if err := c.ShouldBind(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{
            "message": "invalid form data",
            "error":   err.Error(),
        })
        return
    }

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

   // UPload to storage
   fileURL, err := h.storage.UploadFile(file)
   if err != nil {
         c.JSON(http.StatusInternalServerError, gin.H{
            "message": "error uploading file to S3",
            "error":   err.Error(),
        })
        return
   }
    c.JSON(http.StatusOK, gin.H{
        "message": fmt.Sprintf("'%s' uploaded successfully!", file.Filename),
        "name":    req.Name,
        "style":   req.Style,
        "fileUrl": fileURL,
    })

}