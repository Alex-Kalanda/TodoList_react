import {
  TODOS_LOAD,
  OPEN_MODAL_CREATE,
  OPEN_MODAL_EDIT,
  SEND_NEW_TODO,
  UPDATE_TODO,
  UPDATE_STATUS,
  DELETE_TODO,
} from './types';
import { ActionTodo } from './store';

export function loadTodos() {
  return async (dispatch: (action: ActionTodo) => void) => {
    // separate in different function (API)
    const response = await fetch(`${process.env.REACT_APP_TODO_ENDPOINT}`);
    const jsonData = await response.json();
    dispatch({
      type: TODOS_LOAD,
      payload: {
        todos: jsonData,
      },
    });
  };
}
export function openModalCreate() {
  return {
    type: OPEN_MODAL_CREATE,
  };
}
export function openModalEdit() {
  return {
    type: OPEN_MODAL_EDIT,
  };
}
export function sendNewTodo() {
  return {
    type: SEND_NEW_TODO,
  };
}
export function updateTodo() {
  return {
    type: UPDATE_TODO,
  };
}
export function updateStatus() {
  return {
    type: UPDATE_STATUS,
  };
}
export function deleteTodo() {
  return {
    type: DELETE_TODO,
  };
}
