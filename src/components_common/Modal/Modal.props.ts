import { ReactNode } from 'react';

export interface ModalProps {
  children: ReactNode;
  isActive: boolean;
  setActive: (param: boolean) => void;
}
