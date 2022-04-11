import React from 'react';
import styles from './TodoPage.module.css';
import Header from '../../layout/Header/Header';
import { useParams } from 'react-router-dom';
import useTodoData from '../../hooks/useTodoData';
import { Description, Title } from './components';
import { Preloader } from '../../components_common';

const TodoPage = () => {
  const { id } = useParams();
  const todo = useTodoData({ id });

  const content = (
    <div className={styles.content}>
      <Title data={todo?.title} />
      <Description data={todo?.description} />
    </div>
  );

  return (
    <>
      <Header />
      <div className={styles.container}>
        <aside className={styles.aside} />
        {todo ? content : <Preloader />}
      </div>
    </>
  );
};

export default TodoPage;
