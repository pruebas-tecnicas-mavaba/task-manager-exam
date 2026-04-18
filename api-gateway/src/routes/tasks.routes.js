import express from 'express';
import taskServiceClient from '../services/taskServiceClient.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const response = await taskServiceClient.get('/tasks');
    res.status(200).json(response.data);
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    if (!title || !title.trim()) {
      const error = new Error('Title is required');
      error.statusCode = 400;
      throw error;
    }

    const response = await taskServiceClient.post('/tasks', {
      title: title.trim(),
      description: description?.trim() || ''
    });

    res.status(201).json(response.data);
  })
);

router.patch(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    if (!id) {
      const error = new Error('Task id is required');
      error.statusCode = 400;
      throw error;
    }

    if (typeof completed !== 'boolean') {
      const error = new Error('completed (boolean) is required in request body');
      error.statusCode = 400;
      throw error;
    }

    const response = await taskServiceClient.patch(`/tasks/${id}`, {
      completed
    });
    res.status(200).json(response.data);
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
      const error = new Error('Task id is required');
      error.statusCode = 400;
      throw error;
    }

    const response = await taskServiceClient.delete(`/tasks/${id}`);
    res.status(200).json(response.data);
  })
);

export default router;