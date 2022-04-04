import React from 'react';
import styles from './Modal.module.css';
import cn from 'classnames';
import { ModalProps } from './Modal.props';

const Modal = ({ isActive, setActive, children }: ModalProps): JSX.Element => {
  const backGroundStyle = cn(styles.background, {
    [styles.active]: isActive,
  });
  const contentStyle = cn(styles.content, {
    [styles.active]: isActive,
  });

  return (
    <div className={backGroundStyle} onClick={() => setActive(false)}>
      <div className={contentStyle} onClick={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
