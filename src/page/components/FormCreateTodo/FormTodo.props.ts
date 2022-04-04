import { FieldValues, SubmitHandler } from 'react-hook-form';

export interface FormTodoProps {
  isEditMode: boolean;
  onSubmit: SubmitHandler<FieldValues>;
  onUpdate: SubmitHandler<FieldValues>;
  onClose: () => void;
}
