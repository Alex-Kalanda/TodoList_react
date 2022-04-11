import { FieldValues } from 'react-hook-form';

export interface TodoRequest {
  title: string;
  description: string;
}
export interface TodoUpdateStatus {
  status: string;
}
export interface TodoResponse extends TodoRequest {
  id: string;
  status: string;
  createdAt: string;
  modifiedAt?: string;
}
export interface TodoData {
  id: string;
  title: string;
  description: string;
  status: string;
}

export interface TodoCardProps extends TodoResponse {
  onDelete: (id: string) => void;
  onOpenEditModal: (todo: TodoData) => void;
  onUpdate: (data: FieldValues) => void;
}
