import { useEffect, useState } from 'react';
import { emptyTodo } from '../page/MainPage/components/Card/TodoCard.props';

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

const useTodoData = ({ id }: UseTodoData) => {
  const [todo, setTodo] = useState(emptyTodo);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSingleTodo(id).then((response) => {
      setTodo(response);
      setIsLoading(false);
    });
  }, [id]);

  return { todo, isLoading };
};

export default useTodoData;
