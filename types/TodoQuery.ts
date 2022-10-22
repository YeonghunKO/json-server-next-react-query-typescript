export const queryKeys = {
  todos: ['todos'] as const,
  todoById: (todoId: number) => ['todos', todoId],
};
