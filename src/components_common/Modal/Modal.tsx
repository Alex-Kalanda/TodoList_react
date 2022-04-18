import React from 'react';
import styles from './Modal.module.css';
import { ModalProps } from './Modal.props';
import { CloseFormButton } from '../index';

const Modal = ({ onClose, children }: ModalProps): JSX.Element => {
  return (
    <>
      <div className={styles.background} onClick={onClose} />
      <div className={styles.content}>
        <CloseFormButton className={styles.closeFormButton} onClick={onClose} />
        {children}
      </div>
    </>
  );
};

export default Modal;
