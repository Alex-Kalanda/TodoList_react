import React from 'react';
import { FormEditTodoProps } from './FormTodo.props';
import styles from './FormTodo.module.css';
import { useComputeForm } from '../../hooks';
import { CancelButton, UpdateTodoButton } from '../index';

const FormEditTodo = ({ onUpdate, onClose, editTodo }: FormEditTodoProps): JSX.Element => {
  const { settings, handler } = useComputeForm({ onUpdate, editTodo });

  const handlerOnClose = () => {
    onClose();
    handler.onClear();
  };

  return (
    <>
      <form className={styles.form} onSubmit={handler.onUpdate}>
        <label className={styles.form__label} htmlFor="title">
          Title <span className={styles.form__warning}>{settings.input.error}</span>
        </label>
        <input {...settings.input} />

        <label className={styles.form__label} htmlFor="description">
          Description <span className={styles.form__warning}>{settings.textArea.error}</span>
        </label>
        <textarea {...settings.textArea} />

        <div className={styles.form__buttonContainer}>
          <UpdateTodoButton className={styles.form__create} />
          <CancelButton onClick={handlerOnClose} className={styles.form__cancel} />
        </div>
      </form>
    </>
  );
};

export default FormEditTodo;
