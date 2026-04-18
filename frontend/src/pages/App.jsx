import './App.scss';
import { Button } from '@mantine/core';
import { useToDoManager } from '../hooks/useToDoManager';
import { ModalCreateTask } from '../components/ModalCreateTask/ModalCreateTask';
import { List } from 'react-window';
import { Row } from '../components/Row';
import { Box, LoadingOverlay } from '@mantine/core';



function App() {
  const { tasks, handleTaskCompletion, deleteTask, createTask, isLoadingCreateTask, isModalCreateTaskOpen, closeModalCreateTask, openModalCreateTask, loading } = useToDoManager();


  return (
    <>
      <ModalCreateTask
        opened={isModalCreateTaskOpen}
        close={closeModalCreateTask}
        createTask={createTask}
        isLoading={isLoadingCreateTask}
      />

      <Box pos="relative">
        <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        <div className="app">
          <div className="task-list__header">
            <h1>Task Manager</h1>
            <Button
              variant="outline"
              color="blue"
              className="task-list__item-button"
              onClick={openModalCreateTask}
            >
              Add Task
            </Button>
          </div>

          <div className="task-list">
            <List
              style={{ height: '100%', width: '100%' }}
              rowCount={tasks.length}
              rowHeight={80}
              rowComponent={Row}
              rowProps={{
                tasks,
                handleTaskCompletion,
                deleteTask
              }}
            />
          </div>
        </div>
      </Box>

    </>
  );
}

export default App;