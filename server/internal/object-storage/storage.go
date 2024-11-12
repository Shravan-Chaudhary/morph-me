package storage

import "mime/multipart"

type Storage interface {
	UploadFile(file *multipart.FileHeader) (string, error)
}