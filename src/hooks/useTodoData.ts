import { useState } from 'react';
import { Todo } from '../page/MainPage/components/Card/TodoCard.props';

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

const useTodoData = ({ id }: UseTodoData): Todo | null => {
  const [todo, setTodo] = useState<Todo | null>(null);

  getSingleTodo(id).then((response) => {
    setTodo(response);
  });

  return todo;
};

export default useTodoData;
