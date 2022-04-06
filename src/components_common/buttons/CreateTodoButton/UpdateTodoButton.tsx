import React from 'react';
import styles from './TodoButton.module.css';
import cn from 'classnames';
import { TodoButtonProps } from './TodoButton.props';

const UpdateTodoButton = ({ className }: TodoButtonProps): JSX.Element => {
  const buttonStyle = cn(className, styles.button, styles.updateButton);

  return (
    <button type="submit" className={buttonStyle}>
      Edit
    </button>
  );
};

export default UpdateTodoButton;
