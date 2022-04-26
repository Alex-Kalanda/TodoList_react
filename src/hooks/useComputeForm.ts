import styles from '../components_common/form/FormTodo.module.css';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

export interface formParam {
  onSubmit?: SubmitHandler<FieldValues>;
  onUpdate?: SubmitHandler<FieldValues>;
  onClose: () => void;
  editTodo?: {
    id: string;
    status?: string;
    title?: string;
    description?: string;
  };
}

const useComputeForm = ({ onSubmit, onUpdate, editTodo, onClose }: formParam) => {
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
    onClose();
    reset();
  };
  const handlerOnUpdate: SubmitHandler<FieldValues> = (formData) => {
    if (onUpdate) {
      onUpdate({
        id: editTodo?.id,
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
