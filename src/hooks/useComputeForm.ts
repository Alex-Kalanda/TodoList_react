import styles from '../components_common/form/FormTodo.module.css';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

export interface formParam {
  onSubmit?: SubmitHandler<FieldValues>;
  onUpdate?: SubmitHandler<FieldValues>;
  editTodo?: {
    status?: string;
    title?: string;
    description?: string;
  };
}

const useComputeForm = ({ onSubmit, onUpdate, editTodo }: formParam) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: { title: editTodo?.title, description: editTodo?.description, status: editTodo?.status },
    mode: 'all',
  });

  const handlerOnSubmit: SubmitHandler<FieldValues> = (formData) => {
    if (onSubmit) {
      onSubmit(formData);
    }
    reset();
  };

  const settings = {
    input: {
      id: 'title',
      type: 'text',
      error: errors?.title?.message,
      className: styles.form__title,
      ...register('title', {
        required: '- поле должно быть заполнено',
        pattern: {
          value: /.*[^ ].*/,
          message: '- не может состоять из пробелов',
        },
      }),
    },
    textArea: {
      id: 'description',
      error: errors?.description?.message,
      className: styles.form__description,
      ...register('description', {
        required: '- поле должно быть заполнено',
        pattern: {
          value: /.*[^ ].*/,
          message: '- не может состоять из пробелов',
        },
      }),
    },
  };
  const handler = {
    onSubmit: handleSubmit(handlerOnSubmit),
    onUpdate: handleSubmit((formData) => {
      if (onUpdate) {
        onUpdate(formData);
      }
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
