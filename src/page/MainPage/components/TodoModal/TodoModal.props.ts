import { Todo } from '../Card/TodoCard.props';
import { FieldValues, SubmitHandler } from 'react-hook-form';

export interface TodoModalProps {
  isActive: boolean;
  isEditMode: boolean;
  getTodo: () => Todo;
  onClose: () => void;
  onUpdate: SubmitHandler<FieldValues>;
  onSubmit: SubmitHandler<FieldValues>;
}
