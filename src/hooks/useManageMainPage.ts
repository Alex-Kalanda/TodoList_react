import { MainPageAction, MainPageState } from '../page/MainPage.interfaces';
import { useEffect, useReducer } from 'react';
import axios, { AxiosResponse } from 'axios';
import { AMOUNT_DISPLAYED_TODOS } from '../VARS';
import { TodoData } from '../page/components/Card/TodoCard.props';
import { FieldValues } from 'react-hook-form';

const initState: MainPageState = {
  isLoading: true,
  isEditMode: false,
  isModalActive: false,
  activeTodo: { id: '', title: '', description: '', status: '' },
  todos: [],
  displayedTodos: [],
  filter: 'all',
};

const ACTION = 'action;';

function reducer(state: MainPageState, action: MainPageAction): MainPageState {
  switch (action.type) {
    case ACTION:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

const useManageMainPage = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  const { activeTodo, todos, filter } = state;

  const getTodos = () => {
    axios
      .get(`${process.env.REACT_APP_TODO_ENDPOINT}`)
      .then((response: AxiosResponse) => {
        if (response.data) {
          const todos = response.data;
          dispatch({ type: ACTION, payload: { todos, isLoading: false } });
        }
      })
      .catch((error) => {
        throw error;
      });
  };

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    const filteredTodos = filter === 'all' ? todos : todos.filter(({ status }) => status === filter);
    const displayedTodos = filteredTodos.slice(-AMOUNT_DISPLAYED_TODOS);

    dispatch({ type: ACTION, payload: { displayedTodos } });
  }, [filter, todos]);

  const handler = {
    onSubmit: (data: FieldValues) => {
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
        .then((response: AxiosResponse) => {
          const updatedTodos = [...todos, response.data];
          dispatch({ type: ACTION, payload: { todos: updatedTodos, isModalActive: false } });
        })
        .catch((error) => {
          throw error;
        });
    },
    onUpdate: (data: FieldValues) => {
      axios({
        url: process.env.REACT_APP_TODO_ENDPOINT,
        method: 'patch',
        params: {
          'Content-Type': 'application/json',
        },
        data: {
          id: activeTodo?.id,
          ...data,
        },
      })
        .then((response: AxiosResponse) => {
          if (response.statusText === 'OK') {
            getTodos();
          }
          dispatch({ type: ACTION, payload: { isEditMode: false, isModalActive: false } });
        })
        .catch((error) => {
          throw error;
        });
    },
    onFilter: (target: string) => {
      dispatch({ type: ACTION, payload: { filter: target } });
    },
    onDelete: (id: string) => {
      axios({
        url: process.env.REACT_APP_TODO_ENDPOINT,
        method: 'delete',
        params: {
          'Content-Type': 'application/json',
        },
        data: { id: id },
      })
        .then((response: AxiosResponse) => {
          const todos = response.data;
          dispatch({ type: ACTION, payload: { todos } });
        })
        .catch((error) => {
          throw error;
        });
    },
    onOpenCreateModal: () => {
      dispatch({ type: ACTION, payload: { isModalActive: true, isEditMode: false } });
    },
    onOpenEditModal: (todo: TodoData) => {
      dispatch({ type: ACTION, payload: { activeTodo: todo, isEditMode: true, isModalActive: true } });
    },
    onCloseModal: () => {
      dispatch({ type: ACTION, payload: { isModalActive: false, isEditMode: false } });
    },
    onSetModalActive: (value: boolean) => {
      dispatch({ type: ACTION, payload: { isModalActive: value } });
    },
  };

  return { handler, state };
};

export default useManageMainPage;
