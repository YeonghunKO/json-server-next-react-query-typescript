import { useMutation, useQueryClient } from 'react-query';
import { editTodo } from '../helper/api';
import { ITodo } from '../types/Todo';
import { queryKeys } from '../types/TodoQuery';

function useTodoEditMutationQuery() {
  const queryClient = useQueryClient();

  return useMutation(editTodo, {
    onMutate: async ({ id, todo }: { id: number; todo: string }) => {
      await queryClient.cancelQueries(queryKeys.todos);
      const previouseTodos = queryClient.getQueryData(
        queryKeys.todos
      ) as ITodo[];
      queryClient.setQueryData<ITodo[]>(queryKeys.todos, oldTodos =>
        (oldTodos as ITodo[]).map(oldTodo =>
          oldTodo.id === id ? { ...oldTodo, todo } : oldTodo
        )
      );

      return { previouseTodos, newTodo: { id, todo } };
    },

    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData(queryKeys.todos, context?.previouseTodos);
    },

    onSettled: _newTodo => {
      queryClient.invalidateQueries(queryKeys.todos);
    },
  });
}

export { useTodoEditMutationQuery };
