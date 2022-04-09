import React from 'react';
import { TodoCardProps } from './TodoCard.props';
import styles from './TodoCard.module.css';
import { DeleteTodoButton, EditTodoButton } from '../../../components_common';
import StatusBox from './StatusBox/StatusBox';

const TodoCard = (props: TodoCardProps): JSX.Element => {
  const { id, title, description, status, onDelete, onOpenEditModal, onUpdate } = props;

  const handlerOnDelete = () => {
    onDelete(id);
  };
  const handlerOnOpenEditModal = () => {
    const todo = { id, title, description, status };
    onOpenEditModal(todo);
  };

  return (
    <div className={styles.card}>
      <DeleteTodoButton className={styles.deleteButton} onClick={handlerOnDelete} />
      <EditTodoButton className={styles.editButton} onClick={handlerOnOpenEditModal} />
      <StatusBox className={styles.statusBox} id={id} status={status} onUpdate={onUpdate} />
      <h3 className={styles.title}>Title: {title}</h3>
      <div className={styles.description}>Description: {description}</div>
    </div>
  );
};

export default TodoCard;
