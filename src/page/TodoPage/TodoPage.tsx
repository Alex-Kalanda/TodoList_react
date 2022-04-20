import React, { useEffect, useState } from 'react';
import styles from './TodoPage.module.css';
import Header from '../../layout/Header';
import { FormEditTodo, Modal, Preloader } from '../../components_common';
import { PageContent } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../redux/store';
import { useParams } from 'react-router-dom';
import { emptyTodo, Todo } from '../MainPage/components/Card/TodoCard.props';
import { useManageRedux } from '../../hooks';
import { loadingDone } from '../../redux/actions';

const TodoPage = () => {
  const { id } = useParams();
  const currentId = id;
  const dispatch = useDispatch();
  const handler = useManageRedux();
  const [todo, setTodo] = useState(emptyTodo);
  const { todos, modal, isLoading } = useSelector((state: State) => state);

  useEffect(() => {
    setTodo(todos.list.find(({ id }: Todo) => id === currentId) as Todo);
    dispatch(loadingDone());
  }, []);

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
