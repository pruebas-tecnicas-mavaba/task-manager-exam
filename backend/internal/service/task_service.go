package service

import (
	"context"
	"errors"
	"strings"

	"task-service/internal/model"
	"task-service/internal/repository"
)

type TaskService struct {
	repo *repository.TaskRepository
}

func NewTaskService(repo *repository.TaskRepository) *TaskService {
	return &TaskService{repo: repo}
}

func (s *TaskService) GetAllTasks(ctx context.Context) ([]model.Task, error) {
	return s.repo.GetAll(ctx)
}

func (s *TaskService) CreateTask(ctx context.Context, title, description string) (*model.Task, error) {
	title = strings.TrimSpace(title)
	description = strings.TrimSpace(description)

	if title == "" {
		return nil, errors.New("title is required")
	}

	return s.repo.Create(ctx, title, description)
}

func (s *TaskService) CompleteTask(ctx context.Context, id string) (*model.Task, error) {
	id = strings.TrimSpace(id)
	if id == "" {
		return nil, errors.New("task id is required")
	}

	return s.repo.MarkCompleted(ctx, id)
}

func (s *TaskService) DeleteTask(ctx context.Context, id string) error {
	id = strings.TrimSpace(id)
	if id == "" {
		return errors.New("task id is required")
	}

	return s.repo.Delete(ctx, id)
}