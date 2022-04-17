import { FieldValues, SubmitHandler } from 'react-hook-form';
import { Todo } from '../Card/TodoCard.props';

export interface FormCreateTodoProps {
  onSubmit: SubmitHandler<FieldValues>;
  onClose: () => void;
}

export interface FormEditTodoProps {
  editTodo: Todo;
  onUpdate: SubmitHandler<FieldValues>;
  onClose: () => void;
}
