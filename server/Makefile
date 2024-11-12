ARTIFACT_NAME := morph-me

build:
	@go build -o bin/$(ARTIFACT_NAME)/$(ARTIFACT_NAME) cmd/$(ARTIFACT_NAME)/main.go

dev:
	@go run cmd/$(ARTIFACT_NAME)/main.go

dev_db:
	docker run --rm --name generic-mongo-container -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=root -v generic-mongo:/data/db -p 27017:27017 -d mongo