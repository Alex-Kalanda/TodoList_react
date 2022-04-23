import { useEffect, useState } from 'react';
import { getSingleTodoApi } from '../API';
import { finishLoading } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { emptyTodo, Todo } from '../page/MainPage/components/Card/TodoCard.props';

const useGetTodo = (todos: Todo[]): Todo => {
  const dispatch = useDispatch();
  const { id = '' } = useParams();
  const [todo, setTodo] = useState(emptyTodo);

  useEffect(() => {
    if (todos.length === 0) {
      getSingleTodoApi(id).then((r) => {
        setTodo(r);
        dispatch(finishLoading());
      });
    } else {
      setTodo(todos.find((todo) => todo.id === id) as Todo);
    }
  }, [dispatch, id, todos]);

  return todo;
};

export default useGetTodo;
