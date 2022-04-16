import { Todo } from '../MainPage/components/Card/TodoCard.props';

export interface TodoPageState {
  isLoading: boolean;
  isModalActive: boolean;
  todo: Todo;
}
export interface TodoPageAction {
  type: string;
  payload: {
    isLoading?: boolean;
    isModalActive?: boolean;
    todo?: Todo;
  };
}
