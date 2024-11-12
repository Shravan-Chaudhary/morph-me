package server

import (
	"context"
	"log"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"
)

type Server struct {
	Addr         string
	Handler      *gin.Engine
	ReadTimeout  time.Duration
	WriteTimeout time.Duration
}

func NewServer(Addr string, Handler *gin.Engine) *Server {
	return &Server{
		Addr:         Addr,
		Handler:      Handler,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}
}

func (s *Server) Start() {
	server := &http.Server{
		Addr:         s.Addr,
		Handler:      s.Handler,
		ReadTimeout:  s.ReadTimeout,
		WriteTimeout: s.WriteTimeout,
	}

	done := make(chan os.Signal, 1)
	signal.Notify(done, os.Interrupt, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		slog.Info("Server started on", slog.String("addr", s.Addr))
		if err := server.ListenAndServe(); err != nil {
			log.Fatal("Failed to start server", err.Error())
		}
	}()

	<-done

	slog.Info("Shutting down server")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := server.Shutdown(ctx); err != nil {
		slog.Error("Failed to shutdown server", slog.String("error", err.Error()))
	}

	slog.Info("Server gracefully stopped")
}
