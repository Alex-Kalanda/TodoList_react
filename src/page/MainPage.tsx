import React, { useEffect } from 'react';
import styles from './MainPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Todo } from './components/Card/TodoCard.props';
import { CreateTodoButtonNew, Preloader } from '../components_common';
import Modal from '../components_common/Modal/Modal';
import { EmptyCard, FormCreateTodo, FormEditTodo, TodoCard } from './components';
import { loadTodos } from '../redux/actions';
import { State } from '../redux/store';
import useManageMain from '../hooks/useManageMain';

const MainPage = () => {
  const dispatch = useDispatch();
  const h = useManageMain();

  const { todos, modal, isLoading } = useSelector((state: State) => state);

  useEffect(() => {
    dispatch(loadTodos());
  }, []);

  const getActiveTodo = () => {
    return todos.list.find(({ id }) => id === todos.active) as Todo;
  };

  const todoList = todos.list.map((todo: Todo) => {
    return (
      <TodoCard
        key={todo.id}
        onDelete={h.onDelete}
        onUpdate={h.onUpdate}
        onOpenEditModal={h.onOpenEditModal}
        onSetActiveTodo={h.onSetActiveTodo}
        {...todo}
      />
    );
  });

  const content = (
    <main className={styles.page}>
      {todos.list.length === 0 ? <EmptyCard /> : todoList}

      <CreateTodoButtonNew className={styles.page__button} onClick={h.onOpenCreateModal} />

      {modal.isActive && (
        <Modal onClose={h.onCloseModal}>
          {modal.isEditMode ? (
            <FormEditTodo editValues={getActiveTodo()} onUpdate={h.onUpdate} onClose={h.onCloseModal} />
          ) : (
            <FormCreateTodo onSubmit={h.onCreate} onClose={h.onCloseModal} />
          )}
        </Modal>
      )}
    </main>
  );

  return isLoading ? <Preloader /> : content;
};

export default MainPage;
