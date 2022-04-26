import { combineReducers } from 'redux';
import { todosReducer } from './reducers/todosReducer';
import { modalReducer } from './reducers/modalReducer';
import { loadingReducer } from './reducers/loadingReducer';

export const rootReducer = combineReducers({
  todos: todosReducer,
  modal: modalReducer,
  isLoading: loadingReducer,
});
