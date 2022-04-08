import React from 'react';
import { CancelButtonProps } from './CancelButton.props';
import styles from './CancelButton.module.css';
import cn from 'classnames';

const CancelButton = ({ onClick, className }: CancelButtonProps): JSX.Element => {
  const buttonStyle = cn(className, styles.button, styles.form_button);

  return (
    <button type="button" onClick={onClick} className={buttonStyle}>
      Cancel
    </button>
  );
};

export default CancelButton;
