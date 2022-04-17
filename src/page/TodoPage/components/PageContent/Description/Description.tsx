import React from 'react';
import styles from './Description.module.css';
import { DescriptionProps } from './Description.props';

const Description = ({ data }: DescriptionProps): JSX.Element => {
  return (
    <div>
      <h3 className={styles.caption}>Description</h3>
      <p className={styles.description}>{data}</p>
    </div>
  );
};

export default Description;
