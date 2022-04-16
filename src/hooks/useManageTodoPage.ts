import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { FieldValues } from 'react-hook-form';
import { TodoPageAction, TodoPageState } from '../page/TodoPage/TodoPage.interfaces';
import { Todo } from '../page/MainPage/components/Card/TodoCard.props';

const initState: TodoPageState = {
  isLoading: true,
  isModalActive: false,
  todo: { id: '', title: '', description: '', status: '', createdAt: '' },
};

const ACTION = 'action;';

function reducer(state: TodoPageState, action: TodoPageAction): TodoPageState {
  switch (action.type) {
    case ACTION:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

const getTodo = async (id: string) => {
  try {
    const response: Response = await fetch(`${process.env.REACT_APP_TODO_ENDPOINT}/${id}`);
    return response.json();
  } catch (e) {
    throw e;
  }
};

const useManageTodoPage = () => {
  const { id = '0' } = useParams();
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    getTodo(id).then((todo: Todo) => {
      dispatch({ type: ACTION, payload: { todo } });
    });
  }, [id]);

  const handler = {
    onUpdate: (data: FieldValues) => {
      axios({
        url: process.env.REACT_APP_TODO_ENDPOINT,
        method: 'patch',
        params: {
          'Content-Type': 'application/json',
        },
        data: {
          id,
          ...data,
        },
      })
        .then((response: AxiosResponse) => {
          if (response.statusText === 'OK') {
            getTodo(id).then((todo: Todo) => {
              dispatch({ type: ACTION, payload: { todo } });
            });
          }
          dispatch({ type: ACTION, payload: { isModalActive: false } });
        })
        .catch((error) => {
          throw error;
        });
    },
    onOpenEditModal: () => {
      dispatch({ type: ACTION, payload: { isModalActive: true } });
    },
    onCloseModal: () => {
      dispatch({ type: ACTION, payload: { isModalActive: false } });
    },
    onSetModalActive: (value: boolean) => {
      dispatch({ type: ACTION, payload: { isModalActive: value } });
    },
  };

  return { handler, state };
};

export default useManageTodoPage;
