package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/redis/go-redis/v9"
	"go.uber.org/zap"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Initialize logger
	logger, _ := zap.NewProduction()
	defer logger.Sync()
	sugar := logger.Sugar()

	// Initialize Redis client
	rdb := redis.NewClient(&redis.Options{
		Addr:     getEnv("REDIS_ADDR", "localhost:6379"),
		Password: getEnv("REDIS_PASSWORD", ""),
		DB:       0,
	})

	// Initialize Gin router
	router := gin.New()
	router.Use(gin.Recovery())

	// Configure CORS
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{getEnv("DJANGO_SERVICE_URL", "http://localhost:8000")}
	config.AllowCredentials = true
	router.Use(cors.New(config))

	// Health check endpoint
	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status": "healthy",
		})
	})

	// API routes
	v1 := router.Group("/api/v1")
	{
		// Example of a high-performance endpoint
		v1.GET("/cached-data/:key", func(c *gin.Context) {
			key := c.Param("key")
			ctx := context.Background()

			// Try to get data from Redis
			val, err := rdb.Get(ctx, key).Result()
			if err == redis.Nil {
				// Key does not exist
				c.JSON(http.StatusNotFound, gin.H{"error": "Data not found"})
				return
			} else if err != nil {
				sugar.Errorw("Failed to get data from Redis",
					"error", err,
					"key", key,
				)
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
				return
			}

			c.JSON(http.StatusOK, gin.H{"data": val})
		})

		// Example of a compute-intensive endpoint
		v1.POST("/process-data", func(c *gin.Context) {
			var data struct {
				Input string `json:"input" binding:"required"`
			}

			if err := c.ShouldBindJSON(&data); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}

			// Simulate some intensive processing
			time.Sleep(100 * time.Millisecond)

			c.JSON(http.StatusOK, gin.H{
				"processed": true,
				"input":    data.Input,
			})
		})
	}

	// Start server
	srv := &http.Server{
		Addr:    getEnv("GO_SERVICE_PORT", ":8080"),
		Handler: router,
	}

	// Graceful shutdown
	go func() {
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			sugar.Fatalw("Failed to start server",
				"error", err,
			)
		}
	}()

	// Wait for interrupt signal
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	sugar.Info("Shutting down server...")

	// Give outstanding requests 5 seconds to complete
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		sugar.Fatalw("Server forced to shutdown",
			"error", err,
		)
	}

	sugar.Info("Server exiting")
}

// getEnv gets an environment variable or returns a default value
func getEnv(key, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
} 
