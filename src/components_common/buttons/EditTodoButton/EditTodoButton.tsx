import React from 'react';
import cn from 'classnames';
import styles from './EditTodoButton.module.css';
import { EditTodoButtonProps } from './EditTodoButton.props';

const EditTodoButton = ({ shape, value, className, onClick }: EditTodoButtonProps): JSX.Element => {
  const buttonStyles = cn(className, styles.button, {
    [styles.rect]: shape === 'rectangle',
    [styles.circle]: shape === 'circle',
  });

  return <input type="button" onClick={onClick} className={buttonStyles} value={value} />;
};

export default EditTodoButton;
