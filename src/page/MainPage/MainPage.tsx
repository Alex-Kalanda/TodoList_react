import React, { useEffect } from 'react';
import styles from './MainPage.module.css';
import { CreateTodoButtonNew, Preloader } from '../../components_common';
import Header from '../../layout/Header/Header';
import { EmptyCard, EmptyCardFilter, FilterBar, TodoCard } from './components';
import { Todo } from './components/Card/TodoCard.props';
import { AMOUNT_DISPLAYED_TODOS } from '../../VARS';
import TodoModal from './components/TodoModal/TodoModal';
import { useManageMain } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../redux/store';
import { loadTodos } from '../../redux/actions';

const innerTextFilter: Record<string, string> = {
  // keys based on TodoStatus
  all: 'All',
  todo: 'Todo',
  in_progress: 'In progress',
  completed: 'Done',
};

const MainPage = () => {
  const dispatch = useDispatch();
  const h = useManageMain();

  const { todos, modal, isLoading } = useSelector((state: State) => state);

  useEffect(() => {
    dispatch(loadTodos());
  }, []);

  const getActiveTodo = () => {
    return todos.list.find(({ id }: Todo) => id === todos.active) as Todo;
  };

  const filteredTodos = todos.list
    .filter(({ status }: Todo) => todos.filter === 'all' || todos.filter === status)
    .slice(-AMOUNT_DISPLAYED_TODOS);

  const todoList = (
    <>
      <FilterBar onFilter={h.onSetFilter} activeFilter={todos.filter} />
      {filteredTodos.length === 0 && <EmptyCardFilter filter={innerTextFilter[todos.filter]} />}
      {filteredTodos.map((todo: Todo) => {
        return (
          <TodoCard
            key={todo.id}
            onDelete={h.onDelete}
            onUpdate={h.onUpdate}
            onOpenEditModal={h.onOpenEditModal}
            onSetActive={h.onSetActive}
            {...todo}
          />
        );
      })}
    </>
  );

  const content = (
    <main className={styles.page}>
      {todos.list.length === 0 ? <EmptyCard /> : todoList}

      <CreateTodoButtonNew className={styles.page__button} onClick={h.onOpenCreateModal} />

      <TodoModal
        isEditMode={modal.isEditMode}
        getTodo={getActiveTodo}
        isActive={modal.isActive}
        onUpdate={h.onUpdate}
        onSubmit={h.onCreate}
        onClose={h.onCloseModal}
      />
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
