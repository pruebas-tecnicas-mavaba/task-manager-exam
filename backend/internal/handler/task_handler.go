package handler

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"backend/internal/service"
)

type TaskHandler struct {
	service *service.TaskService
}

type CreateTaskRequest struct {
	Title       string `json:"title"`
	Description string `json:"description"`
}

type UpdateTaskRequest struct {
	Completed *bool `json:"completed"`
}

func NewTaskHandler(service *service.TaskService) *TaskHandler {
	return &TaskHandler{service: service}
}

func (h *TaskHandler) RegisterRoutes(router *gin.Engine) {
	router.GET("/health", h.Health)
	router.GET("/tasks", h.GetTasks)
	router.POST("/tasks", h.CreateTask)
	router.PATCH("/tasks/:id", h.UpdateTask)
	router.DELETE("/tasks/:id", h.DeleteTask)
}

func (h *TaskHandler) Health(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "Task service is running",
	})
}

func (h *TaskHandler) GetTasks(c *gin.Context) {
	tasks, err := h.service.GetAllTasks(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, tasks)
}

func (h *TaskHandler) CreateTask(c *gin.Context) {
	var req CreateTaskRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "invalid request body",
		})
		return
	}

	task, err := h.service.CreateTask(c.Request.Context(), req.Title, req.Description)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, task)
}

func (h *TaskHandler) UpdateTask(c *gin.Context) {
	id := c.Param("id")

	var req UpdateTaskRequest
	if err := c.ShouldBindJSON(&req); err != nil || req.Completed == nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "invalid request body: completed (boolean) is required",
		})
		return
	}

	task, err := h.service.UpdateTask(c.Request.Context(), id, *req.Completed)
	if err != nil {
		status := http.StatusBadRequest
		if err.Error() == "task not found" {
			status = http.StatusNotFound
		}

		c.JSON(status, gin.H{
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, task)
}

func (h *TaskHandler) DeleteTask(c *gin.Context) {
	id := c.Param("id")

	err := h.service.DeleteTask(c.Request.Context(), id)
	if err != nil {
		status := http.StatusBadRequest
		if err.Error() == "task not found" {
			status = http.StatusNotFound
		}

		c.JSON(status, gin.H{
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "task deleted successfully",
	})
}