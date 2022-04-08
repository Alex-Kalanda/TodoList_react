import React from 'react';
import cn from 'classnames';
import styles from './TodoButton.module.css';
import { CreateTodoButtonNewProps } from './TodoButton.props';

const CreateTodoButtonNew = ({ onClick, className }: CreateTodoButtonNewProps): JSX.Element => {
  const buttonStyle = cn(className, styles.button, styles.createNewButton);

  return (
    <button type="button" onClick={onClick} className={buttonStyle}>
      Create new
    </button>
  );
};

export default CreateTodoButtonNew;
