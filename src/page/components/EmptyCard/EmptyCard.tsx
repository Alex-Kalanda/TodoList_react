import React from 'react';
import styles from './EmptyCard.module.css';

const EmptyCard = (): JSX.Element => {
  return (
    <div className={styles.card}>
      <span>There is nothing here...</span>
      <span>Please create one</span>
    </div>
  );
};

export default EmptyCard;
