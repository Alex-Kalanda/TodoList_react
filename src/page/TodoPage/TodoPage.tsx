import React from 'react';
import styles from './TodoPage.module.css';
import Header from '../../layout/Header';
import { FormEditTodo, Modal, Preloader } from '../../components_common';
import { PageContent } from './components';
import { useSelector } from 'react-redux';
import { State } from '../../redux/store';
import { useManageRedux } from '../../hooks';
import useGetTodo from '../../hooks/useGetTodo';

const TodoPage = () => {
  const handler = useManageRedux();
  const { todos, modal, isLoading } = useSelector((state: State) => state);
  const todo = useGetTodo(todos.list);

  const content = (
    <main>
      <PageContent
        className={styles.content}
        {...todo}
        onUpdate={handler.onUpdate}
        onOpenEditModal={handler.onOpenEditModal}
      />

      {modal.isActive && (
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
        {isLoading ? <Preloader /> : content}
      </div>
    </>
  );
};

export default TodoPage;
