import React, { useEffect, useState } from 'react';
import EmptyCard from './components/EmptyCard/EmptyCard';
import styles from './MainPage.module.css';
import { TodoResponse, TodoCardProps } from './components/Card/TodoCard.props';
import TodoCard from './components/Card/TodoCard';
import axios, { AxiosResponse } from 'axios';
import { CreateTodoButtonNew, Preloader } from '../components_common';
import Modal from '../components_common/Modal/Modal';
import FormTodo from './components/FormCreateTodo/FormTodo';
import { FieldValues, SubmitHandler } from 'react-hook-form';

const MainPage = () => {
  const [todos, setTodos] = useState<TodoCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalActive, setModalActive] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [editTodoId, setEditTodoId] = useState('');

  const getTodos = () => {
    axios
      .get(`${process.env.REACT_APP_TODO_ENDPOINT}`)
      .then((response: AxiosResponse) => {
        if (response.data) {
          setTodos(response.data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        throw error;
      });
  };

  const currentTodo = todos.filter(({ id }) => id === editTodoId)[0];

  useEffect(() => {
    setIsLoading(true);
    getTodos();
  }, []);

  const handlerOnDelete = (id: string) => {
    axios({
      url: process.env.REACT_APP_TODO_ENDPOINT,
      method: 'delete',
      params: {
        'Content-Type': 'application/json',
      },
      data: { id: id },
    })
      .then((resp) => {
        setTodos(resp.data);
      })
      .catch((error) => {
        throw error;
      });
  };

  const handlerOnOpenEditModal = (id: string) => {
    setEditTodoId(id);
    setEditMode(true);
    setModalActive(true);
  };

  const handlerOnUpdate = (data: FieldValues) => {
    axios({
      url: process.env.REACT_APP_TODO_ENDPOINT,
      method: 'patch',
      params: {
        'Content-Type': 'application/json',
      },
      data: {
        id: editTodoId,
        ...data,
      },
    })
      .then((resp) => {
        if (resp.statusText === 'OK') {
          getTodos();
        }
        setModalActive(false);
      })
      .catch((error) => {
        throw error;
      });
  };

  const handlerOnSubmit: SubmitHandler<FieldValues> = (data) => {
    axios({
      url: process.env.REACT_APP_TODO_ENDPOINT,
      method: 'post',
      params: {
        headers: {
          'Content-Type': 'application/json',
        },
      },
      data: data,
    })
      .then((resp) => {
        setTodos([...todos, resp.data]);
        setModalActive(false);
      })
      .catch((error) => {
        throw error;
      });
  };

  const todoList = todos.map((todo: TodoResponse) => {
    return <TodoCard key={todo.id} onDelete={handlerOnDelete} onOpenEditModal={handlerOnOpenEditModal} {...todo} />;
  });

  const content = (
    <main className={styles.page}>
      {todos.length === 0 ? <EmptyCard /> : todoList}
      <CreateTodoButtonNew
        className={styles.page__button}
        onClick={() => {
          setEditMode(false);
          setModalActive(true);
        }}
      />
      <Modal isActive={isModalActive} setActive={setModalActive}>
        <FormTodo
          isEditMode={isEditMode}
          onSubmit={handlerOnSubmit}
          onUpdate={handlerOnUpdate}
          onClose={() => setModalActive(false)}
        />
      </Modal>
    </main>
  );

  return isLoading ? <Preloader /> : content;
};

export default MainPage;
