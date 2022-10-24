import { queryKeys } from './../types/TodoQuery';
import { useQueryClient, useMutation } from 'react-query';
import { deleteTodo } from '../helper/api';
import { ITodo } from '../types/Todo';

export function useTodoDeleteMutationQuery() {
  const queryClient = useQueryClient();

  return useMutation(deleteTodo, {
    onMutate: async (id: number) => {
      await queryClient.cancelQueries(queryKeys.todos);
      const previousTodos = queryClient.getQueryData(queryKeys.todos);
      queryClient.setQueryData<ITodo[]>(queryKeys.todos, oldTodos =>
        (oldTodos as ITodo[]).filter(oldTodo => oldTodo.id !== id)
      );
      return { previousTodos };
    },

    onError: async (_err, _newTodo, context) => {
      queryClient.setQueryData(queryKeys.todos, context?.previousTodos);
    },
    onSettled: async () => {
      queryClient.invalidateQueries(queryKeys.todos);
    },
  });
}
