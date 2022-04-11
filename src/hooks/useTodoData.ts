import { useEffect, useState } from 'react';
import { TodoResponse } from '../page/MainPage/components/Card/TodoCard.props';
import axios, { AxiosResponse } from 'axios';

interface UseTodoData {
  id?: string;
}

const useTodoData = ({ id }: UseTodoData): TodoResponse | null => {
  const [todo, setTodo] = useState<TodoResponse | null>(null);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_TODO_ENDPOINT}/${id}`)
      .then((response: AxiosResponse) => {
        if (response.data) {
          setTodo(response.data);
        }
      })
      .catch((error) => {
        throw error;
      });
  });

  return todo;
};

export default useTodoData;
