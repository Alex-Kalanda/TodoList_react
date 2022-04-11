import React from 'react';
import styles from './TodoButton.module.css';
import cn from 'classnames';
import { TodoButtonProps } from './TodoButton.props';

const CreateTodoButton = ({ className }: TodoButtonProps): JSX.Element => {
  const buttonStyle = cn(className, styles.button, styles.form__button);

  return (
    <button type="submit" className={buttonStyle}>
      Create
    </button>
  );
};

export default CreateTodoButton;
