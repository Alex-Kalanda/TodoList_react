import { combineReducers } from 'redux';
import { todosReducer } from './reducers/todosReducer';

export const rootReducer = combineReducers({
  //writing all reducers from components
  todos: todosReducer,
});
