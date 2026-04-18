package main

import (
	"context"
	"log"

	"cloud.google.com/go/firestore"
	"github.com/gin-gonic/gin"

	"task-service/internal/config"
	"task-service/internal/handler"
	"task-service/internal/repository"
	"task-service/internal/service"
)

func main() {
	cfg := config.LoadConfig()

	ctx := context.Background()

	firestoreClient, err := firestore.NewClient(ctx, cfg.GCPProjectID)
	if err != nil {
		log.Fatalf("failed to create firestore client: %v", err)
	}
	defer firestoreClient.Close()

	taskRepo := repository.NewTaskRepository(firestoreClient, cfg.FirestoreCollection)
	taskService := service.NewTaskService(taskRepo)
	taskHandler := handler.NewTaskHandler(taskService)

	router := gin.Default()
	taskHandler.RegisterRoutes(router)

	log.Printf("Task service running on port %s", cfg.Port)
	if err := router.Run(":" + cfg.Port); err != nil {
		log.Fatalf("failed to start server: %v", err)
	}
}