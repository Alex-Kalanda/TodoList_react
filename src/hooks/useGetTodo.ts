import { useEffect, useState } from 'react';
import { getSingleTodoApi } from '../API';
import { finishLoading } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { emptyTodo, Todo } from '../page/MainPage/components/Card/TodoCard.props';

const useGetTodo = (todos: Todo[]): Todo => {
  const dispatch = useDispatch();
  const { id = '' } = useParams();
  const currentId = id;
  const isEmptyTodos = todos.length === 0;
  const [todo, setTodo] = useState(emptyTodo);

  useEffect(() => {
    if (isEmptyTodos) {
      getSingleTodoApi(id).then((r) => {
        setTodo(r);
        dispatch(finishLoading());
      });
    } else {
      setTodo(todos.find(({ id }) => id === currentId) as Todo);
    }
  }, [dispatch, id, todos]);

  return todo;
};

export default useGetTodo;
