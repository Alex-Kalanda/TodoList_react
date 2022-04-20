import { Todo } from './components/Card/TodoCard.props';

export interface MainPageState {
  isLoading: boolean;
  isEditMode: boolean;
  isModalActive: boolean;
  activeTodoID: string;
  todos: Todo[];
  filter: string;
}

export interface MainPageAction {
  type: string;
  payload: {
    isLoading?: boolean;
    isEditMode?: boolean;
    isModalActive?: boolean;
    activeTodoID?: string;
    todos?: Todo[];
    filter?: string;
  };
}
