package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port                string
	GCPProjectID        string
	FirestoreCollection string
}

func LoadConfig() *Config {
	_ = godotenv.Load()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8081"
	}

	projectID := os.Getenv("GCP_PROJECT_ID")
	if projectID == "" {
		log.Fatal("GCP_PROJECT_ID is required")
	}

	collection := os.Getenv("FIRESTORE_COLLECTION")
	if collection == "" {
		collection = "tasks"
	}

	return &Config{
		Port:                port,
		GCPProjectID:        projectID,
		FirestoreCollection: collection,
	}
}