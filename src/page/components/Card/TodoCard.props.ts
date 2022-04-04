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

export interface TodoCardProps extends TodoResponse {
  onDelete: (id: string) => void;
  onOpenEditModal: (id: string) => void;
}
