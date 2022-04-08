import React from 'react';
import styles from './Preloader.module.css';

const Preloader = (): JSX.Element => {
  return (
    <div className={styles.preloader}>
      <div className={styles.wrapper}>
        <div className={styles.circle} />
        <div className={styles.circle} />
        <div className={styles.circle} />
        <div className={styles.shadow} />
        <div className={styles.shadow} />
        <div className={styles.shadow} />
        <div className={styles.text}>Loading</div>
      </div>
    </div>
  );
};

export default Preloader;
