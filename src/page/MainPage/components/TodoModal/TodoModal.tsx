import React from 'react';
import { FormCreateTodo, FormEditTodo, Modal } from '../../../../components_common';
import { TodoModalProps } from './TodoModal.props';

const TodoModal = (props: TodoModalProps): JSX.Element => {
  const { isActive, isEditMode, getTodo, onClose, onUpdate, onSubmit } = props;

  const editForm = <FormEditTodo editTodo={getTodo()} onUpdate={onUpdate} onClose={onClose} />;
  const createForm = <FormCreateTodo onSubmit={onSubmit} onClose={onClose} />;

  return <>{isActive && <Modal onClose={onClose}>{isEditMode ? editForm : createForm}</Modal>}</>;
};

export default TodoModal;
