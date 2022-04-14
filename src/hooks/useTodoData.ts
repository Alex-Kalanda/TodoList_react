import { useState } from 'react';
import { TodoResponse } from '../page/MainPage/components/Card/TodoCard.props';

interface UseTodoData {
  id: string;
}

const getSingleTodo = async (id: string) => {
  try {
    const response: Response = await fetch(`${process.env.REACT_APP_TODO_ENDPOINT}/${id}`);
    return response.json();
  } catch (e) {
    throw e;
  }
};

const useTodoData = ({ id }: UseTodoData): TodoResponse | null => {
  const [todo, setTodo] = useState<TodoResponse | null>(null);

  getSingleTodo(id).then((response) => {
    setTodo(response);
  });

  return todo;
};

export default useTodoData;
