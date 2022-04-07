import React from 'react';
import { FormEditTodoProps } from './FormTodo.props';
import styles from './FormTodo.module.css';
import { CancelButton, UpdateTodoButton } from '../../../components_common';
import useComputeForm from '../../../hooks/useComputeForm';

const FormEditTodo = ({ onUpdate, onClose, editValues }: FormEditTodoProps): JSX.Element => {
  const { settings, handler } = useComputeForm({ onUpdate, editValues });

  const handlerOnClose = () => {
    onClose();
    handler.onClear();
  };

  return (
    <>
      <form className={styles.form} onSubmit={handler.onUpdate}>
        <label className={styles.form__label} htmlFor="title">
          Title
        </label>
        <input {...settings.input} />
        <span>{settings.input.error}</span>

        <label className={styles.form__label} htmlFor="description">
          Description
        </label>
        <textarea {...settings.textArea} />
        <span>{settings.textArea.error}</span>

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
          <CancelButton onClick={handlerOnClose} className={styles.form__cancel} />
        </div>
      </form>
    </>
  );
};

export default FormEditTodo;
