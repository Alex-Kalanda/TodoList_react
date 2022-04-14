import React from 'react';
import styles from './Description.module.css';
import { DescriptionProps } from './Description.props';

const Description = ({ data }: DescriptionProps): JSX.Element => {
  return (
    <div>
      <h3 className={styles.caption}>Description</h3>
      <div className={styles.description}>{data}</div>
    </div>
  );
};

export default Description;
