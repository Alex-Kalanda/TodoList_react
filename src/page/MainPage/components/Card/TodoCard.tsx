import React from 'react';
import { TodoCardProps } from './TodoCard.props';
import styles from './TodoCard.module.css';
import StatusBox from './StatusBox/StatusBox';
import { useNavigate } from 'react-router-dom';
import { DeleteTodoButton, EditTodoButton } from '../../../../components_common';

const TodoCard = (props: TodoCardProps): JSX.Element => {
  const navigate = useNavigate();

  const { id, title, description, status, onDelete, onOpenEditModal, onUpdate } = props;

  const handlerOnDelete = () => {
    onDelete(id);
  };
  const handlerOnOpenEditModal = () => {
    onOpenEditModal(id);
  };
  const handlerOnRedirect = () => {
    navigate(`/todo/${id}`);
  };

  return (
    <div className={styles.card} onDoubleClick={handlerOnRedirect}>
      <DeleteTodoButton className={styles.deleteButton} onClick={handlerOnDelete} />
      <EditTodoButton className={styles.editButton} onClick={handlerOnOpenEditModal} />
      <StatusBox className={styles.statusBox} id={id} status={status} onUpdate={onUpdate} />
      <h3 className={styles.title}>Title: {title}</h3>
      <div className={styles.description}>Description: {description}</div>
    </div>
  );
};

export default TodoCard;
