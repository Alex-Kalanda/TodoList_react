import styles from '../page/components/form/FormTodo.module.css';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { TodoStatus } from '../enums/enums';

interface formParam {
  onSubmit?: SubmitHandler<FieldValues>;
  onUpdate?: SubmitHandler<FieldValues>;
  onClose: () => void;
  editValues?: {
    id: string;
    status?: string;
    title?: string;
    description?: string;
  };
}

const useComputeForm = ({ onSubmit, onClose, onUpdate, editValues }: formParam) => {
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
    onClose();
    reset();
  };
  const handlerOnUpdate: SubmitHandler<FieldValues> = (formData) => {
    if (onUpdate) {
      onUpdate({
        id: editValues?.id,
        ...formData,
      });
    }
    onClose();
    reset();
  };
  const handlerOnClose = () => {
    onClose();
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
    onUpdate: handleSubmit(handlerOnUpdate),
    onClose: handlerOnClose,
  };

  return {
    settings,
    handler,
  };
};

export default useComputeForm;
