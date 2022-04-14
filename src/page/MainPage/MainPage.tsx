import React from 'react';
import styles from './MainPage.module.css';
import { CreateTodoButtonNew, Modal, Preloader } from '../../components_common';
import useManageMainPage from '../../hooks/useManageMainPage';
import Header from '../../layout/Header/Header';
import { EmptyCard, EmptyCardFilter, FilterBar, FormCreateTodo, FormEditTodo, TodoCard } from './components';
import { TodoResponse } from './components/Card/TodoCard.props';

const innerTextFilter: Record<string, string> = {
  // keys based on TodoStatus
  all: 'All',
  todo: 'Todo',
  in_progress: 'In progress',
  completed: 'Done',
};

const MainPage = () => {
  const { handler, state } = useManageMainPage();
  const { isLoading, isEditMode, isModalActive, activeTodo, todos, displayedTodos, filter } = state;

  const todoList = (
    <>
      <FilterBar onFilter={handler.onFilter} activeFilter={filter} />
      {displayedTodos.length === 0 && <EmptyCardFilter filter={innerTextFilter[filter]} />}
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

  return (
    <>
      <Header />
      {isLoading ? <Preloader /> : content}
    </>
  );
};

export default MainPage;
