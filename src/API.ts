import { BASE_URL } from './VARS';
import { FieldValues } from 'react-hook-form';

export const getTodosApi = async () => {
  const resp = await fetch(`${BASE_URL}`);
  return resp.json();
};
export const getSingleTodoApi = async (id: string) => {
  const resp = await fetch(`${BASE_URL}/${id}`);
  return resp.json();
};

export const deleteTodoApi = async (id: string) => {
  const params = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id }),
  };

  const resp = await fetch(`${BASE_URL}`, params);
  return await resp.json();
};

export const updateTodoApi = async (data: FieldValues) => {
  const params = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const resp = await fetch(`${BASE_URL}`, params);
  return await resp.json();
};

export const createTodoApi = async (data: FieldValues) => {
  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const resp = await fetch(`${BASE_URL}`, params);
  return await resp.json();
};
