import axios from 'axios';
import { ITodo } from '../types/Todo';
import { request } from '../utils/axios-utils';

export const addTodo = async (newTodo: ITodo) => {
  const { data } = await request({ method: 'post', data: newTodo });

  return data;
};

export const getTodos = async () => {
  const { data } = await request({ method: 'get' });

  return data;
};

export const editTodo = async ({ id, todo }: { id: number; todo: string }) => {
  const { data } = await request({
    method: 'patch',
    url: `/${id}`,
    data: { id, todo },
  });

  return data;
};
