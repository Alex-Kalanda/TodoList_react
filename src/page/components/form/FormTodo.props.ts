import { FieldValues, SubmitHandler } from 'react-hook-form';
import { TodoData } from '../Card/TodoCard.props';

export interface FormCreateTodoProps {
  onSubmit: SubmitHandler<FieldValues>;
  onClose: () => void;
}

export interface FormEditTodoProps {
  editValues: TodoData;
  onUpdate: SubmitHandler<FieldValues>;
  onClose: () => void;
}
