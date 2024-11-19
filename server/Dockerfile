# Build stage using Alpine for smaller builder image
FROM golang:1.23-alpine AS builder

# Set working directory for build
WORKDIR /build

# Copy the rest of the source code
# cmd/ contains your main application entry point
# internal/ contains private application and library code
COPY . .
# Download dependencies
RUN go mod download


# Build the application
# -ldflags="-w -s" removes debug information and symbol table
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build \
    -ldflags="-w -s" \
    -o morph-me \
    ./cmd/morph-me/main.go

# Final stage using distroless for minimal production image
FROM gcr.io/distroless/base-debian12

# Set working directory for application
WORKDIR /app

# Copy only the compiled binary from builder
COPY --from=builder /build/morph-me /app/morph-me


# Command to run the application
CMD ["/app/morph-me"]