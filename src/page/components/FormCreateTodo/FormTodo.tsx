import React from 'react';
import { FormTodoProps } from './FormTodo.props';
import styles from './FormTodo.module.css';
import { CancelButton, CloseFormButton, CreateTodoButton, UpdateTodoButton } from '../../../components_common';
import useComputeForm from '../../../hooks/useComputeForm';

const FormTodo = ({ onSubmit, onUpdate, onClose, isEditMode }: FormTodoProps): JSX.Element => {
  const { settings, handler } = useComputeForm({ onSubmit, onUpdate });

  return (
    <>
      <CloseFormButton
        className={styles.closeFormButton}
        onClick={() => {
          onClose();
          handler.onClear();
        }}
      />

      <form className={styles.form} onSubmit={isEditMode ? handler.onUpdate : handler.onSubmit}>
        <label className={styles.form__label} htmlFor="title">
          Title
        </label>
        <input {...settings.input} />

        <label className={styles.form__label} htmlFor="description">
          Description
        </label>
        <textarea {...settings.textArea} />

        <div className={styles.form__buttonContainer}>
          {isEditMode ? (
            <UpdateTodoButton className={styles.form__create} />
          ) : (
            <CreateTodoButton className={styles.form__create} />
          )}
          <CancelButton className={styles.form__cancel} onClick={handler.onClear} />
        </div>
      </form>
    </>
  );
};

export default FormTodo;
