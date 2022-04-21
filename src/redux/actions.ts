import {
  TODOS_LOAD,
  OPEN_MODAL_CREATE,
  OPEN_MODAL_EDIT,
  UPDATE_TODO,
  DELETE_TODO,
  CREATE_TODO,
  SET_ACTIVE_TODO,
  LOADING_DATA,
  SET_FILTER,
  SINGLE_TODO_LOAD,
} from './types';
import { ActionTodo } from './store';
import { FieldValues } from 'react-hook-form';
import { createTodoApi, deleteTodoApi, getSingleTodoApi, getTodosApi, updateTodoApi } from '../API';

export function loadTodos() {
  return async (dispatch: (action: ActionTodo) => void) => {
    const response = await getTodosApi();
    dispatch({
      type: TODOS_LOAD,
      payload: {
        todos: {
          list: response,
        },
      },
    });
    dispatch({
      type: LOADING_DATA,
      payload: {
        isLoading: false,
      },
    });
  };
}
export function loadSingleTodo(id: string) {
  return async (dispatch: (action: ActionTodo) => void) => {
    const response = await getSingleTodoApi(id);
    dispatch({
      type: SINGLE_TODO_LOAD,
      payload: {
        todos: {
          current: response,
        },
      },
    });
    dispatch({
      type: LOADING_DATA,
      payload: {
        isLoading: false,
      },
    });
  };
}

export function createTodo(data: FieldValues) {
  return async (dispatch: (action: ActionTodo) => void) => {
    const response = await createTodoApi(data);
    dispatch({
      type: CREATE_TODO,
      payload: {
        todos: {
          update: response,
        },
      },
    });
  };
}
export function deleteTodo(id: string) {
  return async (dispatch: (action: ActionTodo) => void) => {
    const response = await deleteTodoApi(id);
    dispatch({
      type: DELETE_TODO,
      payload: {
        todos: {
          list: response,
        },
      },
    });
  };
}
export function updateTodo(data: FieldValues) {
  return async (dispatch: (action: ActionTodo) => void) => {
    const response = await updateTodoApi(data);
    dispatch({
      type: UPDATE_TODO,
      payload: {
        todos: {
          update: response,
        },
      },
    });
  };
}

export function openModalCreate() {
  return {
    type: OPEN_MODAL_CREATE,
    payload: {
      modal: {
        isActive: true,
        isEditMode: false,
      },
    },
  };
}
export function openModalEdit() {
  return {
    type: OPEN_MODAL_EDIT,
    payload: {
      modal: {
        isActive: true,
        isEditMode: true,
      },
    },
  };
}
export function closeModal() {
  return {
    type: OPEN_MODAL_EDIT,
    payload: {
      modal: {
        isActive: false,
        isEditMode: false,
      },
    },
  };
}
export function setActiveTodo(id: string) {
  return {
    type: SET_ACTIVE_TODO,
    payload: {
      todos: {
        active: id,
      },
    },
  };
}
export function setFilter(filter: string) {
  return {
    type: SET_FILTER,
    payload: {
      todos: {
        filter: filter,
      },
    },
  };
}
export function redirect() {
  return {
    type: LOADING_DATA,
    payload: {
      isLoading: true,
    },
  };
}
