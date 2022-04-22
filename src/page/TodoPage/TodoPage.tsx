import React, { useEffect, useState } from 'react';
import styles from './TodoPage.module.css';
import Header from '../../layout/Header';
import { FormEditTodo, Modal, Preloader } from '../../components_common';
import { PageContent } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../redux/store';
import { useParams } from 'react-router-dom';
import { useManageRedux } from '../../hooks';
import { finishLoading } from '../../redux/actions';
import { emptyTodo, Todo } from '../MainPage/components/Card/TodoCard.props';
import { getSingleTodoApi } from '../../API';

const TodoPage = () => {
  const dispatch = useDispatch();
  const { id = '' } = useParams();
  const currentId = id;
  const [todo, setTodo] = useState(emptyTodo);
  const handler = useManageRedux();
  const { todos, modal, isLoading } = useSelector((state: State) => state);

  useEffect(() => {
    getSingleTodoApi(id).then((r) => {
      setTodo(r);
      dispatch(finishLoading());
    });
  }, [dispatch, id]);
  useEffect(() => {
    setTodo(todos.list.find(({ id }) => id === currentId) as Todo);
  }, [currentId, todos.list]);

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
