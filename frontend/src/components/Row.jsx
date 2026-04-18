import { Checkbox } from '@mantine/core';
import { Button } from '@mantine/core';
import { Trash } from 'lucide-react';
import '../pages/App.scss';



const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const Row = ({ index, style, ariaAttributes, tasks, handleTaskCompletion, deleteTask }) => {
  const task = tasks[index];

  return (
    <div style={style} {...ariaAttributes}>
      <div className="task-list__item-wrapper">
        <Checkbox
          classNames={{
            input: 'task-list__item-checkbox',
          }}
          size="md"
          checked={task.completed}
          onChange={() => handleTaskCompletion(task.id, !task.completed)}
        />

        <div className="task-list__item-content">
          <span
            className="task-list__item-title"
            data-completed={task.completed}
          >
            {task.title}
          </span>

          <span
            className="task-list__item-description"
            data-completed={task.completed}
          >
            {formatDate(task.created_at)} - {task.description}
          </span>
        </div>

        <Button
          variant="outline"
          color="red"
          className="task-list__item-button"
          onClick={() => deleteTask(task.id)}
        >
          <Trash />
        </Button>
      </div>
    </div>
  );
};