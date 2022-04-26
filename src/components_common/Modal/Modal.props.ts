import { ReactNode } from 'react';

export interface ModalProps {
  setActive?: (param: boolean) => void;
  onClose: () => void;
  children: ReactNode;
}
