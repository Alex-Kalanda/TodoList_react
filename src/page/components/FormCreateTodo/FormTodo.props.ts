import { FieldValues, SubmitHandler } from 'react-hook-form';

export interface FormTodoProps {
  title: string;
  description: string;
  isEditMode: boolean;
  onSubmit: SubmitHandler<FieldValues>;
  onUpdate: SubmitHandler<FieldValues>;
  onClose: () => void;
}
