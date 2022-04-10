import React from 'react';
import EmptyCard from './components/EmptyCard/EmptyCard';
import styles from './MainPage.module.css';
import { TodoResponse } from './components/Card/TodoCard.props';
import TodoCard from './components/Card/TodoCard';
import { CreateTodoButtonNew, Preloader } from '../components_common';
import Modal from '../components_common/Modal/Modal';
import FormEditTodo from './components/form/FormEditTodo';
import FormCreateTodo from './components/form/FormCreateTodo';
import useManageMainPage from '../hooks/useManageMainPage';
import FilterBar from './components/FilterBar/FilterBar';

const MainPage = () => {
  const { handler, state } = useManageMainPage();
  const { isLoading, isEditMode, isModalActive, activeTodo, todos, displayedTodos, filter } = state;

  const todoList = (
    <>
      <FilterBar onFilter={handler.onFilter} activeFilter={filter} />
      {displayedTodos.map((todo: TodoResponse) => {
        return (
          <TodoCard
            key={todo.id}
            onDelete={handler.onDelete}
            onUpdate={handler.onUpdate}
            onOpenEditModal={handler.onOpenEditModal}
            {...todo}
          />
        );
      })}
    </>
  );

  const content = (
    <main className={styles.page}>
      {todos.length === 0 ? <EmptyCard /> : todoList}

      <CreateTodoButtonNew className={styles.page__button} onClick={handler.onOpenCreateModal} />

      {isModalActive && (
        <Modal setActive={handler.onSetModalActive} onClose={handler.onCloseModal}>
          {isEditMode ? (
            <FormEditTodo editValues={activeTodo} onUpdate={handler.onUpdate} onClose={handler.onCloseModal} />
          ) : (
            <FormCreateTodo onSubmit={handler.onSubmit} onClose={handler.onCloseModal} />
          )}
        </Modal>
      )}
    </main>
  );

  return isLoading ? <Preloader /> : content;
};

export default MainPage;
