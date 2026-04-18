import { useState } from 'react';
import { Modal } from '@mantine/core';
import { Input } from '@mantine/core';
import { Button } from '@mantine/core';
import './ModalCreateTask.scss';

export const ModalCreateTask = ({ opened, close, createTask, isLoading }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');


  return (
    <Modal opened={opened} onClose={close} title="Create Task">
      <div className="modal-create-task__content-wrapper">
        <Input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Button onClick={() => createTask(title, description)} loading={isLoading}>Create</Button>
      </div>
    </Modal>
  )
}