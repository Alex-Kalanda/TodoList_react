import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { FieldValues } from 'react-hook-form';
import { TodoPageAction, TodoPageState } from '../page/TodoPage/TodoPage.interfaces';
import { Todo } from '../page/MainPage/components/Card/TodoCard.props';
import { BASE_URL } from '../VARS';

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
    const response: Response = await fetch(`${BASE_URL}/${id}`);
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
    onUpdate: async (data: FieldValues) => {
      const requestParams = {
        url: BASE_URL,
        method: 'patch',
        params: {
          headers: {
            'Content-Type': 'application/json',
          },
        },
        data: {
          id,
          ...data,
        },
      } as AxiosRequestConfig;

      try {
        const response: AxiosResponse = await axios(requestParams);
        dispatch({ type: ACTION, payload: { todo: response.data, isModalActive: false } });
      } catch (e) {
        throw e;
      }
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
