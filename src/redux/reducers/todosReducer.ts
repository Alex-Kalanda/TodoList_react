import {
  CREATE_TODO,
  DELETE_TODO,
  SET_ACTIVE_TODO,
  SET_FILTER,
  SINGLE_TODO_LOAD,
  TODOS_LOAD,
  UPDATE_TODO,
} from '../types';
import { ActionTodo } from '../store';
import { AMOUNT_DISPLAYED_TODOS } from '../../VARS';
import { emptyTodo, Todo } from '../../page/MainPage/components/Card/TodoCard.props';

const initialState = {
  list: [],
  active: '',
  update: null,
  current: emptyTodo,
  filter: 'all',
};

export const todosReducer = (state = initialState, action: ActionTodo) => {
  switch (action.type) {
    case TODOS_LOAD:
      const todos_load = action.payload.todos?.list as Todo[];
      return {
        ...state,
        list: todos_load.slice(-AMOUNT_DISPLAYED_TODOS),
      };
    case SINGLE_TODO_LOAD:
      const current_todo = action.payload.todos?.current as Todo;
      return {
        ...state,
        current: current_todo,
      };
    case DELETE_TODO:
      const todos_del = action.payload.todos?.list as Todo[];
      return {
        ...state,
        list: todos_del.slice(-AMOUNT_DISPLAYED_TODOS),
      };
    case CREATE_TODO:
      const newTodo = action.payload.todos?.update as Todo;
      const todos_new = [...state.list, newTodo] as Todo[];
      return {
        ...state,
        list: todos_new.slice(-AMOUNT_DISPLAYED_TODOS),
      };
    case UPDATE_TODO:
      const updTodo = action.payload.todos?.update as Todo;
      const todos_upd = [...state.list] as Todo[];
      const oldTodo = todos_upd.find(({ id }) => id === updTodo?.id) as Todo;
      oldTodo.title = updTodo?.title;
      oldTodo.description = updTodo?.description;
      oldTodo.status = updTodo?.status;
      oldTodo.modifiedAt = updTodo?.modifiedAt;
      return {
        ...state,
        current: updTodo,
        list: todos_upd.slice(-AMOUNT_DISPLAYED_TODOS),
      };
    case SET_ACTIVE_TODO:
      return {
        ...state,
        active: action.payload.todos?.active,
      };
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload.todos?.filter,
      };
    default:
      return state;
  }
};
