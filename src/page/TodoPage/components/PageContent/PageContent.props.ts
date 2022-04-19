import { FieldValues } from 'react-hook-form';

export interface PageContentProps {
  className?: string;
  id: string;
  title: string;
  description: string;
  status: string;
  onUpdate: (data: FieldValues) => void;
  onOpenEditModal: () => void;
}
