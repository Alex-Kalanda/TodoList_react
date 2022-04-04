import styles from '../page/components/FormCreateTodo/FormTodo.module.css';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

interface formParam {
  onSubmit: SubmitHandler<FieldValues>;
  onUpdate: SubmitHandler<FieldValues>;
}

const useComputeForm = ({ onSubmit, onUpdate }: formParam) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const handlerOnSubmit: SubmitHandler<FieldValues> = (formData) => {
    onSubmit(formData);
    reset();
  };

  const settings = {
    input: {
      id: 'title',
      type: 'text',
      error: errors?.title?.message,
      className: styles.form__title,
      ...register('title', {
        required: 'Поле должно быть заполнено',
      }),
    },
    textArea: {
      id: 'description',
      error: errors?.description?.message,
      className: styles.form__description,
      ...register('description', {
        required: 'Поле должно быть заполнено',
      }),
    },
  };
  const handler = {
    onSubmit: handleSubmit(handlerOnSubmit),
    onUpdate: handleSubmit((formData) => {
      onUpdate(formData);
      reset();
    }),
    onClear: () => {
      reset();
    },
  };

  return {
    settings,
    handler,
  };
};

export default useComputeForm;
