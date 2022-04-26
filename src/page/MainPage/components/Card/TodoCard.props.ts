import { FieldValues } from 'react-hook-form';

export interface Todo {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  modifiedAt?: string;
}

export const emptyTodo = {
  id: '',
  title: '',
  description: '',
  status: '',
  createdAt: '',
};

export interface TodoCardProps extends Todo {
  onDelete: (id: string) => void;
  onOpenEditModal: (id: string) => void;
  onUpdate: (data: FieldValues) => void;
  onSetActive: (id: string) => void;
}
