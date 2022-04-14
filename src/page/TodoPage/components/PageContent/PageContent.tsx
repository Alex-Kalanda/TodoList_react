import React from 'react';
import styles from './PageContent.module.css';
import { PageContentProps } from './PageContent.props';
import Title from './Title';
import Description from './Description';

const PageContent = ({ title, description }: PageContentProps): JSX.Element => {
  return (
    <div className={styles.content}>
      <Title data={title} />
      <Description data={description} />
    </div>
  );
};

export default PageContent;
