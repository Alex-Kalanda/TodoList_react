import React from 'react';
import styles from './TodoPage.module.css';
import Header from '../../layout/Header/Header';
import { useParams } from 'react-router-dom';
import { Preloader } from '../../components_common';
import { PageContent } from './components';
import { useTodoData } from '../../hooks';

const TodoPage = () => {
  const { id = '0' } = useParams();
  const { todo, isLoading } = useTodoData({ id });

  return (
    <>
      <Header />
      <div className={styles.container}>
        <aside className={styles.aside} />
        {isLoading ? <Preloader /> : <PageContent {...todo} />}
      </div>
    </>
  );
};

export default TodoPage;
