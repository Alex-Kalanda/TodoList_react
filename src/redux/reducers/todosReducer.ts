import { TODOS_LOAD } from '../types';
import { ActionTodo, State } from '../store';

const initialState: State = {
  isLoading: true,
  isEditMode: false,
  isModalActive: false,
  activeTodoID: '',
  todos: [],
};

export const todosReducer = (state: State = initialState, action: ActionTodo) => {
  console.log('comments reducer >>> ', action);
  switch (action.type) {
    case TODOS_LOAD:
      return {
        ...state,
        todos: action.payload.todos,
      };
    default:
      return state;
  }
};
