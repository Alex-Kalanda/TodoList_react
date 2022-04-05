import React from 'react';
import { CancelButtonProps } from './CancelButton.props';
import styles from './CancelButton.module.css';
import cn from 'classnames';

const CancelButton = ({ className }: CancelButtonProps): JSX.Element => {
  const buttonStyle = cn(className, styles.button, styles.form_button);

  return (
    <button type="reset" className={buttonStyle}>
      Cancel
    </button>
  );
};

export default CancelButton;
