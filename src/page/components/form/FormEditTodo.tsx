import React from 'react';
import { FormEditTodoProps } from './FormTodo.props';
import styles from './FormTodo.module.css';
import { CancelButton, CloseFormButton, UpdateTodoButton } from '../../../components_common';
import useComputeForm from '../../../hooks/useComputeForm';

const FormEditTodo = ({ onUpdate, onClose, editValues }: FormEditTodoProps): JSX.Element => {
  const { settings, handler } = useComputeForm({ onUpdate, editValues });

  return (
    <>
      <CloseFormButton
        className={styles.closeFormButton}
        onClick={() => {
          onClose();
          handler.onClear();
        }}
      />

      <form className={styles.form} onSubmit={handler.onUpdate}>
        <label className={styles.form__label} htmlFor="title">
          Title
        </label>
        <input {...settings.input} />

        <label className={styles.form__label} htmlFor="description">
          Description
        </label>
        <textarea {...settings.textArea} />

        <fieldset className={styles.form__fieldset}>
          <legend>Choose status of {'TODO'}</legend>
          <div>
            <input {...settings.status.todo} />
            <label htmlFor="todo">Need to do!</label>
          </div>
          <div>
            <input {...settings.status.inProgress} />
            <label htmlFor="inProgress">In progress...</label>
          </div>
          <div>
            <input {...settings.status.completed} />
            <label htmlFor="completed">Finished</label>
          </div>
        </fieldset>

        <div className={styles.form__buttonContainer}>
          <UpdateTodoButton className={styles.form__create} />
          <CancelButton className={styles.form__cancel} />
        </div>
      </form>
    </>
  );
};

export default FormEditTodo;
