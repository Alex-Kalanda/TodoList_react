import { CREATE_TODO, DELETE_TODO, SET_ACTIVE_TODO, TODOS_LOAD, UPDATE_TODO } from '../types';
import { ActionTodo } from '../store';
import { Todo } from '../../page/components/Card/TodoCard.props';
import { AMOUNT_DISPLAYED_TODOS } from '../../VARS';

const initialState = {
  list: [],
  active: '',
};

export const todosReducer = (state = initialState, action: ActionTodo) => {
  switch (action.type) {
    case TODOS_LOAD:
      const todos_load = action.payload.todos as Todo[];
      return {
        ...state,
        list: todos_load.slice(-AMOUNT_DISPLAYED_TODOS),
      };
    case DELETE_TODO:
      const todos_del = action.payload.todos as Todo[];
      return {
        ...state,
        list: todos_del.slice(-AMOUNT_DISPLAYED_TODOS),
      };
    case CREATE_TODO:
      const newTodo = action.payload.todos?.update as Todo;
      const todos_new = [...state.list] as Todo[];
      todos_new.push(newTodo);
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
        list: todos_upd.slice(-AMOUNT_DISPLAYED_TODOS),
      };
    case SET_ACTIVE_TODO:
      return {
        ...state,
        active: action.payload.todos?.active,
      };
    default:
      return state;
  }
};
