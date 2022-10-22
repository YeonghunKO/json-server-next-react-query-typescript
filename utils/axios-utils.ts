import axios from 'axios';
import { AxiosError, AxiosResponse } from 'axios';
import { ITodo } from '../types/Todo';

const client = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL });

export const request = async ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer token`;
  const onSuccess = (reponse: AxiosResponse<ITodo[]> | any) => reponse;
  const onError = (error: AxiosError) => {
    return error;
  };

  return client(options).then(onSuccess).catch(onError);
};
