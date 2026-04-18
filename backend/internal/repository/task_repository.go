package repository

import (
	"context"
	"errors"
	"time"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"

	"task-service/internal/model"
)

type TaskRepository struct {
	client     *firestore.Client
	collection string
}

func NewTaskRepository(client *firestore.Client, collection string) *TaskRepository {
	return &TaskRepository{
		client:     client,
		collection: collection,
	}
}

func (r *TaskRepository) GetAll(ctx context.Context) ([]model.Task, error) {
	iter := r.client.Collection(r.collection).
		OrderBy("createdAt", firestore.Desc).
		Documents(ctx)

	var tasks []model.Task

	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil, err
		}

		var task model.Task
		if err := doc.DataTo(&task); err != nil {
			return nil, err
		}

		task.ID = doc.Ref.ID
		tasks = append(tasks, task)
	}

	return tasks, nil
}

func (r *TaskRepository) Create(ctx context.Context, title, description string) (*model.Task, error) {
	task := &model.Task{
		Title:       title,
		Description: description,
		Completed:   false,
		CreatedAt:   time.Now().UTC(),
	}

	docRef, _, err := r.client.Collection(r.collection).Add(ctx, map[string]interface{}{
		"title":       task.Title,
		"description": task.Description,
		"completed":   task.Completed,
		"createdAt":   task.CreatedAt,
	})
	if err != nil {
		return nil, err
	}

	task.ID = docRef.ID
	return task, nil
}

func (r *TaskRepository) MarkCompleted(ctx context.Context, id string) (*model.Task, error) {
	docRef := r.client.Collection(r.collection).Doc(id)

	doc, err := docRef.Get(ctx)
	if err != nil {
		return nil, err
	}

	if !doc.Exists() {
		return nil, errors.New("task not found")
	}

	_, err = docRef.Update(ctx, []firestore.Update{
		{Path: "completed", Value: true},
	})
	if err != nil {
		return nil, err
	}

	updatedDoc, err := docRef.Get(ctx)
	if err != nil {
		return nil, err
	}

	var task model.Task
	if err := updatedDoc.DataTo(&task); err != nil {
		return nil, err
	}

	task.ID = updatedDoc.Ref.ID
	return &task, nil
}

func (r *TaskRepository) Delete(ctx context.Context, id string) error {
	docRef := r.client.Collection(r.collection).Doc(id)

	doc, err := docRef.Get(ctx)
	if err != nil {
		return err
	}

	if !doc.Exists() {
		return errors.New("task not found")
	}

	_, err = docRef.Delete(ctx)
	return err
}