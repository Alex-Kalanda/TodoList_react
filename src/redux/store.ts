import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from './rootReducer';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import { Todo } from '../page/MainPage/components/Card/TodoCard.props';

export interface State {
  todos: {
    list: Todo[];
    update: Todo | null;
    active: string;
    filter: string;
  };
  modal: {
    isEditMode: boolean;
    isActive: boolean;
  };
  isLoading: boolean;
}
export interface ActionTodo {
  type: string;
  payload: {
    todos?: {
      list?: Todo[];
      update?: Todo | null;
      active?: string;
      filter?: string;
    };
    modal?: {
      isEditMode: boolean;
      isActive: boolean;
    };
    isLoading?: boolean;
  };
}

// when i install chrome extension redux devtools >> add to compose func
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
