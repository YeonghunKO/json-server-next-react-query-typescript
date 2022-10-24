import { ITodo, Optional } from './../types/Todo';
import axios, { AxiosResponse } from 'axios';
import { request } from '../utils/axios-utils';

export const addTodo = async (newTodo: Optional<ITodo>) => {
  const { data } = await request<AxiosResponse<ITodo[]>>({
    method: 'post',
    data: newTodo,
  });

  return data;
};

export const getTodos = async () => {
  const { data } = await request<AxiosResponse<ITodo[]>>({ method: 'get' });

  return data;
};

export const editTodo = async ({
  id,
  ...rest
}: {
  id: number;
  [P: string]: any;
}) => {
  const { data } = await request<AxiosResponse<ITodo[]>>({
    method: 'patch',
    url: `/${id}`,
    data: { ...rest },
  });

  return data;
};

export const deleteTodo = async (id: number) => {
  await request({ method: 'delete', url: `/${id}` });
};
