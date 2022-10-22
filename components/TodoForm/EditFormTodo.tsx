import { Paper, TextField } from '@material-ui/core';
import { useTodoEditMutationQuery } from '../../hooks/useEditTodoOptimisticMutation';
import useInputState from '../../hooks/useInputState';

import styles from './editForm.module.css';

interface IEditTodoFormProps {
  id: number;
  todo: string;
  resetIsEdit: Function;
}

function EditTodoForm({
  id,
  todo,
  resetIsEdit,
}: IEditTodoFormProps) {
  const [inputVal, setInputVal, resetInputVal] = useInputState(todo);
  const { mutate } = useTodoEditMutationQuery();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ id, todo: inputVal });
    resetInputVal();
    resetIsEdit();
  };
  return (
    <li className={styles.editFormContainer}>
      <form className={styles.editForm} onSubmit={handleSubmit}>
        <TextField
          fullWidth={true}
          style={{ padding: '15px' }}
          value={inputVal}
          onChange={setInputVal}
          autoFocus
        />
      </form>
    </li>
  );
}

export default EditTodoForm;
