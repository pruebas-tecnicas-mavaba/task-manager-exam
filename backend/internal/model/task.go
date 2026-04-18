package model

import "time"


type Task struct {
	ID string `json:"id" firestore:"-"`
	Title string `json:"title" firestore:"title"`
	Description string `json:"description" firestore:"description"`
	Completed bool `json:"completed" firestore:"completed"`
	CreatedAt time.Time `json:"created_at" firestore:"createdAt"`
}