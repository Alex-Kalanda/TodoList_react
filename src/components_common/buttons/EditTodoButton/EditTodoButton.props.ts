export interface EditTodoButtonProps {
  shape: 'circle' | 'rectangle';
  value: string;
  className: string;
  onClick: () => void;
}
