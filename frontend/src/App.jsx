
import { useEffect, useState } from 'react';
import './App.css';
import { Button } from '@mantine/core';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = () => fetch('http://localhost:5173/exampleTasks.json')
      .then(response => response.json())
      .then(data => setTasks(data.tasks));
    fetchTasks();
  }, []);

  const handleTaskCompletion = (id) => {
    const updatedTasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
    setTasks(updatedTasks);
  };

  return (
    <>
      <div className="task-list__header">
        <h1>Task Manager</h1>
        <Button variant="outline" color="blue" className="task-list__item-button">Add Task</Button>
      </div>
      <div className="task-list">
        {tasks.map((task) => (
          <div className="task-list__item-wrapper" key={task.id}>
            <input type="checkbox" checked={task.completed} onChange={() => handleTaskCompletion(task.id)} />
            <div className="task-list__item-content">
              <h3 className="task-list__item-title">{task.title}</h3>
              <p className="task-list__item-description">{task.description} - {task.createdAt}</p>
            </div>
            <Button variant="outline" color="red" className="task-list__item-button">Delete</Button>
          </div>
        ))}
      </div>

    </>
  )
}

export default App
