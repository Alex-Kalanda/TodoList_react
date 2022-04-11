import { FieldValues } from 'react-hook-form';

export interface StatusBoxProps {
  className: string;
  id: string;
  status: string;
  onUpdate: (data: FieldValues) => void;
}
