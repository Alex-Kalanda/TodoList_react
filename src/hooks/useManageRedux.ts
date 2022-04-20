import {
  closeModal,
  createTodo,
  deleteTodo,
  openModalCreate,
  openModalEdit,
  setActiveTodo,
  setFilter,
  updateTodo,
} from '../redux/actions';
import { useDispatch } from 'react-redux';
import { FieldValues } from 'react-hook-form';

const useManageRedux = () => {
  const dispatch = useDispatch();

  return {
    onCreate: (data: FieldValues) => {
      dispatch(createTodo(data));
    },
    onDelete: (id: string) => {
      dispatch(deleteTodo(id));
    },
    onUpdate: (data: FieldValues) => {
      dispatch(updateTodo(data));
    },
    onOpenEditModal: () => {
      dispatch(openModalEdit());
    },
    onOpenCreateModal: () => {
      dispatch(openModalCreate());
    },
    onCloseModal: () => {
      dispatch(closeModal());
    },
    onSetActive: (id: string) => {
      dispatch(setActiveTodo(id));
    },
    onSetFilter: (filter: string) => {
      dispatch(setFilter(filter));
    },
  };
};

export default useManageRedux;
