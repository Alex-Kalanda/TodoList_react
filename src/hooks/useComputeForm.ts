import styles from '../page/components/form/FormTodo.module.css';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { TodoStatus } from '../enums/enums';

interface formParam {
  onSubmit?: SubmitHandler<FieldValues>;
  onUpdate?: SubmitHandler<FieldValues>;
  editValues?: {
    status?: string;
    title?: string;
    description?: string;
  };
}

const useComputeForm = ({ onSubmit, onUpdate, editValues }: formParam) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: { title: editValues?.title, description: editValues?.description, status: editValues?.status },
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
    status: {
      todo: {
        id: 'todo',
        type: 'radio',
        value: TodoStatus.planned,
        ...register('status'),
      },
      inProgress: {
        id: 'inProgress',
        type: 'radio',
        value: TodoStatus.inProgress,
        ...register('status'),
      },
      completed: {
        id: 'completed',
        type: 'radio',
        value: TodoStatus.completed,
        ...register('status'),
      },
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
