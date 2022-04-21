import React, { useEffect } from 'react';
import styles from './TodoPage.module.css';
import Header from '../../layout/Header';
import { FormEditTodo, Modal, Preloader } from '../../components_common';
import { PageContent } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../redux/store';
import { useParams } from 'react-router-dom';
import { useManageRedux } from '../../hooks';
import { loadSingleTodo } from '../../redux/actions';

const TodoPage = () => {
  const dispatch = useDispatch();
  const { id = '' } = useParams();
  const handler = useManageRedux();
  const { todos, modal, isLoading } = useSelector((state: State) => state);

  useEffect(() => {
    dispatch(loadSingleTodo(id));
  }, [dispatch, id]);

  const content = (
    <main>
      <PageContent
        className={styles.content}
        {...todos.current}
        onUpdate={handler.onUpdate}
        onOpenEditModal={handler.onOpenEditModal}
      />

      {modal.isActive && (
        <Modal onClose={handler.onCloseModal}>
          <FormEditTodo editTodo={todos.current} onUpdate={handler.onUpdate} onClose={handler.onCloseModal} />
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
