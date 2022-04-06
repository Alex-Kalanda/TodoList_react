import { MainPageAction, MainPageState } from '../page/MainPage.interfaces';
import { useEffect, useReducer } from 'react';
import axios, { AxiosResponse } from 'axios';
import { AMOUNT_DISPLAYED_TODOS } from '../VARS';
import { TodoData } from '../page/components/Card/TodoCard.props';
import { FieldValues } from 'react-hook-form';

const initState: MainPageState = {
  isLoading: false,
  isEditMode: false,
  isModalActive: false,
  activeTodo: { id: '', title: '', description: '', status: '' },
  todos: [],
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
  const { activeTodo, todos } = state;

  const getTodos = () => {
    axios
      .get(`${process.env.REACT_APP_TODO_ENDPOINT}`)
      .then((response: AxiosResponse) => {
        if (response.data) {
          const displayedTodos = response.data.slice(-AMOUNT_DISPLAYED_TODOS);
          dispatch({ type: ACTION, payload: { todos: displayedTodos, isLoading: false } });
        }
      })
      .catch((error) => {
        throw error;
      });
  };

  useEffect(() => {
    dispatch({ type: ACTION, payload: { isLoading: true } });
    getTodos();
  }, []);

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
          const displayedTodos = [...todos, response.data].slice(-AMOUNT_DISPLAYED_TODOS);
          dispatch({ type: ACTION, payload: { todos: displayedTodos, isModalActive: false } });
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
          const displayedTodos = response.data.slice(-AMOUNT_DISPLAYED_TODOS);
          dispatch({ type: ACTION, payload: { todos: displayedTodos } });
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
