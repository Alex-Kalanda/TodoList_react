import React from 'react';
import styles from './FormTodo.module.css';
import { CancelButton, CloseFormButton, CreateTodoButton } from '../../../components_common';
import useComputeForm from '../../../hooks/useComputeForm';
import { FormCreateTodoProps } from './FormTodo.props';

const FormCreateTodo = ({ onSubmit, onClose }: FormCreateTodoProps): JSX.Element => {
  const { settings, handler } = useComputeForm({ onSubmit });

  return (
    <>
      <CloseFormButton
        className={styles.closeFormButton}
        onClick={() => {
          onClose();
          handler.onClear();
        }}
      />

      <form className={styles.form} onSubmit={handler.onSubmit}>
        <label className={styles.form__label} htmlFor="title">
          Title
        </label>
        <input {...settings.input} />

        <label className={styles.form__label} htmlFor="description">
          Description
        </label>
        <textarea {...settings.textArea} />

        <div className={styles.form__buttonContainer}>
          <CreateTodoButton className={styles.form__create} />
          <CancelButton className={styles.form__cancel} />
        </div>
      </form>
    </>
  );
};

export default FormCreateTodo;
