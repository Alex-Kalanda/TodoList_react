import React from 'react';
import styles from './EmptyCard.module.css';

const EmptyCardFilter = ({ filter }: Record<string, string>): JSX.Element => {
  return (
    <div className={styles.card}>
      <span>There is nothing in &quot;{filter}&quot; now...</span>
    </div>
  );
};

export default EmptyCardFilter;
