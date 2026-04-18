import { useState, useEffect, useCallback } from 'react';

export const useToDoManager = () => {
  const [isModalCreateTaskOpen, setIsModalCreateTaskOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoadingCreateTask, setIsLoadingCreateTask] = useState(false);

  const apiGatewayUrl = import.meta.env.VITE_API_GATEWAY_URL;

  const openModalCreateTask = () => {
    setIsModalCreateTaskOpen(true);
  };

  const closeModalCreateTask = () => {
    setIsModalCreateTaskOpen(false);
  };

  // 🔹 GET TASKS
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${apiGatewayUrl}/api/tasks`);

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const data = await response.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [apiGatewayUrl]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // 🔹 UPDATE TASK (completed desde el body)
  const handleTaskCompletion = async (id, completed) => {
    try {
      setLoading(true);
      const response = await fetch(`${apiGatewayUrl}/api/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed })
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      await fetchTasks();

    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 DELETE TASK
  const deleteTask = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${apiGatewayUrl}/api/tasks/${id}`,
        {
          method: 'DELETE'
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      // 👉 refrescar lista
      await fetchTasks();

    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 CREATE TASK
  const createTask = async (title, description) => {
    try {
      setIsLoadingCreateTask(true);
      const response = await fetch(`${apiGatewayUrl}/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description })
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      await fetchTasks();

    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoadingCreateTask(false);
      closeModalCreateTask();
    }
  };

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    handleTaskCompletion,
    deleteTask,
    createTask,
    isLoadingCreateTask,
    isModalCreateTaskOpen,
    openModalCreateTask,
    closeModalCreateTask,
  };
};