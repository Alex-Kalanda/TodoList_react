import React from 'react';
import { EditTodoButtonProps } from './EditTodoButton.props';
import styles from './EditTodoButton.module.css';
import cn from 'classnames';

const EditTodoButton = ({ onClick, className }: EditTodoButtonProps): JSX.Element => {
  return (
    <button type="button" onClick={onClick} className={cn(className, styles.button)}>
      E
    </button>
  );
};

export default EditTodoButton;
