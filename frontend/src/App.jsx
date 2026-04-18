
import { useEffect, useState } from 'react';
import './App.css';

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
      <h1>Task Manager</h1>
      <div className="task-list">
        {tasks.map((task) => (
          <div className="task-list__item-wrapper" key={task.id}>
            <input type="checkbox" checked={task.completed} onChange={() => handleTaskCompletion(task.id)} />
            <div className="task-list__item-content">
              <h3 className="task-list__item-title">{task.title}</h3>
              <p className="task-list__item-description">{task.description} - {task.createdAt}</p>
            </div>
            <button className="task-list__item-button">Delete</button>
          </div>
        ))}
      </div>

    </>
  )
}

export default App
