import { Todo } from './components/Card/TodoCard.props';

export interface MainPageState {
  isLoading: boolean;
  isEditMode: boolean;
  isModalActive: boolean;
  activeTodo: string;
  todos: Todo[];
}
export interface MainPageAction {
  type: string;
  payload: {
    isLoading?: boolean;
    isEditMode?: boolean;
    isModalActive?: boolean;
    activeTodo?: string;
    todos?: Todo[];
  };
}
