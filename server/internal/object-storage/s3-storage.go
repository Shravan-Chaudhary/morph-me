package storage

import (
	"bytes"
	"context"
	"fmt"
	"mime/multipart"
	"path/filepath"
	"time"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)


type S3Storage struct {
	S3Client *s3.Client
	Bucket string
	Region string
}

func NewS3Storage(bucket string, region string, access_key string, secret_key string) (*S3Storage, error) {
	// create new s3 client here and pass it to the S3Storage struct
	creds := credentials.NewStaticCredentialsProvider(access_key, secret_key, "")
	cfg, err := config.LoadDefaultConfig(context.TODO(), config.WithRegion(region), config.WithCredentialsProvider(creds))
	if err != nil {
		return nil, err
	}

	s3Client := s3.NewFromConfig(cfg)
	return &S3Storage{
		S3Client: s3Client,
		Bucket: bucket,
		Region: region,
	},nil
}

func (s *S3Storage) UploadFile(file *multipart.FileHeader) (string, error) {
	// Open the uploaded file
	src, err := file.Open()
	if err != nil {
		return "", fmt.Errorf("error while opening file: %v", err)
	}
	defer src.Close()

	// Read the file
	buffer := make([]byte, file.Size)
	if _, err := src.Read(buffer); err != nil {
		return "", fmt.Errorf("error while reading file: %v", err)
	}

	// Generate unique filename  (use UUID later)
	ext := filepath.Ext(file.Filename)
	timestamp := time.Now().UnixNano()
    filename := fmt.Sprintf("%d%s", timestamp, ext)

	// Upload to s3
	 _, err = s.S3Client.PutObject(context.TODO(), &s3.PutObjectInput{
		Bucket: aws.String(s.Bucket),
		Key:   aws.String(filename),
		Body: bytes.NewReader(buffer),
	})
	if err != nil {
		return "", fmt.Errorf("error while uploading file: %v", err)
	}

	fileURL := fmt.Sprintf("https://%s.s3.%s.amazonaws.com/%s", s.Bucket, s.Region, filename)
	return fileURL, nil
}