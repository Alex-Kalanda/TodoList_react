import React from 'react';
import styles from './Title.module.css';
import { TitleProps } from './Title.props';

const Title = ({ data }: TitleProps): JSX.Element => {
  return (
    <div>
      <h3 className={styles.caption}>Title</h3>
      <p className={styles.title}>{data}</p>
    </div>
  );
};

export default Title;
