import { CLOSE_MODAL, OPEN_MODAL_CREATE, OPEN_MODAL_EDIT } from '../types';
import { ActionTodo } from '../store';

const initialState = {
  isEditMode: false,
  isActive: false,
};

export const modalReducer = (state = initialState, action: ActionTodo) => {
  switch (action.type) {
    case OPEN_MODAL_CREATE:
      return action.payload;
    case OPEN_MODAL_EDIT:
      return action.payload;
    case CLOSE_MODAL:
      return action.payload;
    default:
      return state;
  }
};
