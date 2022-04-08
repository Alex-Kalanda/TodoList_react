import { TodoData, TodoResponse } from './components/Card/TodoCard.props';

export interface MainPageState {
  isLoading: boolean;
  isEditMode: boolean;
  isModalActive: boolean;
  activeTodo: TodoData;
  todos: TodoResponse[];
}
export interface MainPageAction {
  type: string;
  payload: {
    isLoading?: boolean;
    isEditMode?: boolean;
    isModalActive?: boolean;
    activeTodo?: TodoData;
    todos?: TodoResponse[];
  };
}
