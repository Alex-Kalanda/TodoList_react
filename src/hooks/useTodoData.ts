import { useEffect, useState } from 'react';
import { emptyTodo } from '../page/MainPage/components/Card/TodoCard.props';
import { BASE_URL } from '../VARS';

interface UseTodoData {
  id: string;
}

const getSingleTodo = async (id: string) => {
  try {
    const response: Response = await fetch(`${BASE_URL}/${id}`);
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
