import { useMutation, useQueryClient } from 'react-query';
import { addTodo } from '../helper/api';
import { ITodo } from '../types/Todo';
import { queryKeys } from '../types/TodoQuery';
// : UseMutationResult<ITodo, AxiosError>
// const addTodo = 'addtodo';

// onSuccess,onError를 호출할때마다 다르게 지정하고 싶다면, callback으로 넘기자
function useTodoPostMutationQuery() {
  const queryClient = useQueryClient();
  //   console.log();

  return useMutation(addTodo, {
    onMutate: async (newTodo: ITodo) => {
      await queryClient.cancelQueries(queryKeys.todos);
      const previouseTodoData = queryClient.getQueryData(queryKeys.todos);
      queryClient.setQueryData<ITodo[]>(queryKeys.todos, oldQueryData => {
        return [
          ...(oldQueryData as ITodo[]),
          { id: (oldQueryData as ITodo[]).length + 1, ...newTodo },
        ];
      });
      return {
        previouseTodoData,
      };
    },

    onError: (_error, _todo, context) => {
      queryClient.setQueriesData(queryKeys.todos, context?.previouseTodoData);
    },

    onSettled: () => {
      queryClient.invalidateQueries(queryKeys.todos);
    },
  });
}

export { useTodoPostMutationQuery };
