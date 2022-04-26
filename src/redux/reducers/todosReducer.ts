import { CREATE_TODO, DELETE_TODO, SET_ACTIVE_TODO, SET_FILTER, TODOS_LOAD, UPDATE_TODO } from '../types';
import { ActionTodo } from '../store';
import { AMOUNT_DISPLAYED_TODOS } from '../../VARS';
import { Todo } from '../../page/MainPage/components/Card/TodoCard.props';

const initialState = {
  list: [],
  active: '',
  update: null,
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
      const index = state.list.findIndex(({ id }) => id === updTodo?.id) as number;
      const updTodoList = [...state.list.slice(0, index), updTodo, ...state.list.slice(index + 1)];
      return {
        ...state,
        list: updTodoList.slice(-AMOUNT_DISPLAYED_TODOS),
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
