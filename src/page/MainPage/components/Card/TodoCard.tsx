import React from 'react';
import { TodoCardProps } from './TodoCard.props';
import styles from './TodoCard.module.css';
import { useNavigate } from 'react-router-dom';
import { DeleteTodoButton, EditTodoButton, StatusBox } from '../../../../components_common';
import { ButtonShape } from '../../../../enums';

const TodoCard = (props: TodoCardProps): JSX.Element => {
  const navigate = useNavigate();

  const { id, title, description, status, onDelete, onOpenEditModal, onSetActive, onUpdate } = props;

  const handlerOnDelete = () => {
    onDelete(id);
  };
  const handlerOnOpenEditModal = () => {
    onSetActive(id);
    onOpenEditModal(id);
  };
  const handlerOnRedirect = () => {
    navigate(`/todo/${id}`);
  };

  return (
    <div className={styles.card} onDoubleClick={handlerOnRedirect}>
      <DeleteTodoButton className={styles.deleteButton} onClick={handlerOnDelete} />
      <EditTodoButton
        shape={ButtonShape.circle}
        value="E"
        className={styles.editButton}
        onClick={handlerOnOpenEditModal}
      />
      <StatusBox className={styles.statusBox} id={id} status={status} onUpdate={onUpdate} />
      <h3 className={styles.title}>Title: {title}</h3>
      <div className={styles.description}>Description: {description}</div>
    </div>
  );
};

export default TodoCard;
