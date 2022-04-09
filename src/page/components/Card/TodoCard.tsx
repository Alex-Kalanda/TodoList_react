import React from 'react';
import { TodoCardProps } from './TodoCard.props';
import styles from './TodoCard.module.css';
import { DeleteTodoButton, EditTodoButton } from '../../../components_common';

const TodoCard = (props: TodoCardProps): JSX.Element => {
  const { id, title, description, status, onDelete, onOpenEditModal } = props;

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
      <div>
        Title: <b>{title}</b>
      </div>
      <div>Description: {description}</div>
    </div>
  );
};

export default TodoCard;
