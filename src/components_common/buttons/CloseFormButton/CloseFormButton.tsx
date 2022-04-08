import React from 'react';
import { CloseFormButtonProps } from './CloseFormButton.props';
import styles from './CloseFormButton.module.css';
import cn from 'classnames';

const CloseFormButton = ({ onClick, className }: CloseFormButtonProps): JSX.Element => {
  return (
    <button type="button" onClick={onClick} className={cn(className, styles.button)}>
      <span className={styles.left} />
      <span className={styles.right} />
    </button>
  );
};

export default CloseFormButton;
