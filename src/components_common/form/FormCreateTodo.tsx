import React from 'react';
import styles from './FormTodo.module.css';
import { FormCreateTodoProps } from './FormTodo.props';
import { useComputeForm } from '../../hooks';
import { CancelButton, CreateTodoButton } from '../index';

const FormCreateTodo = ({ onSubmit, onClose }: FormCreateTodoProps): JSX.Element => {
  const { settings, handler } = useComputeForm({ onSubmit, onClose });

  return (
    <>
      <form className={styles.form} onSubmit={handler.onSubmit}>
        <label className={styles.form__label} htmlFor="title">
          Title <span className={styles.form__warning}>{settings.input.error}</span>
        </label>
        <input {...settings.input} />

        <label className={styles.form__label} htmlFor="description">
          Description <span className={styles.form__warning}>{settings.textArea.error}</span>
        </label>
        <textarea {...settings.textArea} />

        <div className={styles.form__buttonContainer}>
          <CreateTodoButton className={styles.form__create} />
          <CancelButton onClick={handler.onClose} className={styles.form__cancel} />
        </div>
      </form>
    </>
  );
};

export default FormCreateTodo;
