import { ActionTodo } from '../store';
import { LOADING_DATA } from '../types';

export const loadingReducer = (state = true, action: ActionTodo) => {
  switch (action.type) {
    case LOADING_DATA:
      return action.payload.isLoading;
    default:
      return state;
  }
};
