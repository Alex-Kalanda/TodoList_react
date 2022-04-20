import React from 'react';
import styles from './TodoPage.module.css';
import Header from '../../layout/Header';
import { FormEditTodo, Modal, Preloader } from '../../components_common';
import { PageContent } from './components';
import useManageTodoPage from '../../hooks/useManageTodoPage';

const TodoPage = () => {
  const { state, handler } = useManageTodoPage();
  const { todo, isLoading, isModalActive } = state;

  const content = (
    <main>
      <PageContent
        className={styles.content}
        {...todo}
        onUpdate={handler.onUpdate}
        onOpenEditModal={handler.onOpenEditModal}
      />

      {isModalActive && (
        <Modal onClose={handler.onCloseModal}>
          <FormEditTodo editTodo={todo} onUpdate={handler.onUpdate} onClose={handler.onCloseModal} />
        </Modal>
      )}
    </main>
  );

  return (
    <>
      <Header />
      <div className={styles.container}>
        <aside className={styles.aside} />
        {isLoading ? content : <Preloader />}
      </div>
    </>
  );
};

export default TodoPage;
