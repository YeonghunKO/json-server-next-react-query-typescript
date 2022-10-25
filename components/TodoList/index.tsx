import Todo from './Todo';
import { useQuery } from 'react-query';
import { queryKeys } from '../../types/TodoQuery';
import { ITodo } from '../../types/Todo';
import { getTodos } from '../../helper/api';

export default function TodoList() {
  const { data: todos } = useQuery<ITodo[]>(queryKeys.todos, getTodos, {
    notifyOnChangeProps: 'tracked',
  });
  console.log('TODO LIST RENDERING');

  return (
    <ul style={{ width: '100%' }}>
      {todos?.length
        ? todos.map((todo, i) => <Todo {...todo} key={todo.id} />)
        : null}
    </ul>
  );
}
