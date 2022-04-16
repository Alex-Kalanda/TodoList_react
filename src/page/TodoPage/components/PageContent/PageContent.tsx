import React from 'react';
import styles from './PageContent.module.css';
import cn from 'classnames';
import { PageContentProps } from './PageContent.props';
import Title from './Title';
import Description from './Description';
import { EditTodoButton, StatusBox } from '../../../../components_common';
import { ButtonShape } from '../../../../enums';

const PageContent = (props: PageContentProps): JSX.Element => {
  const { className = '', id, title, description, status, onUpdate, onOpenEditModal } = props;

  return (
    <div className={cn(className, styles.content)}>
      <Title data={title} />
      <Description data={description} />
      <div className={styles.buttonsBlock}>
        <StatusBox className={styles.status} id={id} status={status} onUpdate={onUpdate} />
        <EditTodoButton shape={ButtonShape.rect} value="Edit" className={styles.edit} onClick={onOpenEditModal} />
      </div>
    </div>
  );
};

export default PageContent;
