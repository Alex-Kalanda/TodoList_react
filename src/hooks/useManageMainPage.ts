import { useEffect, useReducer } from 'react';
import axios, { AxiosResponse } from 'axios';
import { FieldValues } from 'react-hook-form';
import { MainPageAction, MainPageState } from '../page/MainPage/MainPage.interfaces';
import { BASE_URL } from '../VARS';

const initState: MainPageState = {
  isLoading: true,
  isEditMode: false,
  isModalActive: false,
  activeTodoID: '',
  todos: [],
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
  const { activeTodoID, todos } = state;

  const getTodos = () => {
    axios
      .get(`${BASE_URL}`)
      .then((response: AxiosResponse) => {
        const todos = response.data;
        dispatch({ type: ACTION, payload: { todos, isLoading: false } });
      })
      .catch((error) => {
        throw error;
      });
  };

  useEffect(() => {
    getTodos();
  }, []);

  // TODO: refactor with async await
  const handler = {
    onSubmit: (data: FieldValues) => {
      axios({
        url: BASE_URL,
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
        url: BASE_URL,
        method: 'patch',
        params: {
          'Content-Type': 'application/json',
        },
        data: {
          id: activeTodoID,
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
        url: BASE_URL,
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
    onOpenEditModal: (id: string) => {
      dispatch({ type: ACTION, payload: { activeTodoID: id, isEditMode: true, isModalActive: true } });
    },
    onCloseModal: () => {
      dispatch({ type: ACTION, payload: { isModalActive: false, isEditMode: false } });
    },
  };

  return { handler, state };
};
