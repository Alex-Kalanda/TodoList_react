import { applyMiddleware, compose, createStore } from 'redux';
import { TodoResponse } from '../page/components/Card/TodoCard.props';
import { rootReducer } from './rootReducer';
import thunk from 'redux-thunk';

export interface State {
  todos?: Array<TodoResponse>;
  isLoading: boolean;
  isEditMode: boolean;
  isModalActive: boolean;
  activeTodoID: string;
}
export interface ActionTodo {
  type: string;
  payload: {
    todos?: TodoResponse[];
    isLoading?: boolean;
    isEditMode?: boolean;
    isModalActive?: boolean;
    activeTodoID?: string;
  };
}

// when i install chrome extension redux devtools >> add to compose func
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

export default store;
