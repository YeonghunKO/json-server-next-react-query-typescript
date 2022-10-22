import { Paper, TextField } from '@material-ui/core';
import { addTodo } from '../../helper/api';

import useInputState from '../../hooks/useInputState';
import { useTodoPostMutationQuery } from '../../hooks/useAddTodoOptimisticMutaion';

function TodoForm() {
  const [inputVal, setInputVal, reset] = useInputState('');
  const { mutate } = useTodoPostMutationQuery();
  // console.log('TODOFORM RENDERING');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ isCompleted: false, todo: inputVal });
    reset();
  };

  return (
    <Paper style={{ width: '90%', margin: '1rem' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
        <TextField
          fullWidth
          placeholder="Enter your Todo!"
          margin="normal"
          style={{ padding: '0 10px' }}
          value={inputVal}
          onChange={setInputVal}
        />
      </form>
    </Paper>
  );
}

export default TodoForm;
