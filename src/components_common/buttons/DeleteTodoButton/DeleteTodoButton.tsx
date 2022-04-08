import React from 'react';
import { DeleteTodoButtonProps } from './DeleteTodoButton.props';
import styles from './DeleteTodoButton.module.css';
import cn from 'classnames';

const DeleteTodoButton = ({ onClick, className }: DeleteTodoButtonProps): JSX.Element => {
  return (
    <button type="button" onClick={onClick} className={cn(className, styles.button)}>
      <span className={styles.left} />
      <span className={styles.right} />
    </button>
  );
};

export default DeleteTodoButton;
