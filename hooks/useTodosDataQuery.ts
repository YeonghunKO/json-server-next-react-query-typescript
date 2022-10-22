import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { queryKeys } from '../types/TodoQuery';
import { request } from '../utils/axios-utils';
import { ITodo } from '../types/Todo';

import { AxiosError } from 'axios';

export function useTodosDataQuery(
  options?: UseQueryOptions<ITodo[], AxiosError> | any
): UseQueryResult<ITodo[], AxiosError> {
  return useQuery(queryKeys.todos, () => request({ method: 'get' }), options);
}
