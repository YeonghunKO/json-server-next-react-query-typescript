import { TextField } from '@material-ui/core';
import { UseMutateFunction } from 'react-query';
import useInputState from '../../hooks/useInputState';
import { ITodo } from '../../types/Todo';

import styles from './editForm.module.css';

interface IEditTodoFormProps extends ITodo {
  resetIsEdit: Function;
  mutate: UseMutateFunction<ITodo[], any, any, any>;
}

function EditTodoForm({ id, todo, resetIsEdit, mutate }: IEditTodoFormProps) {
  const [inputVal, setInputVal, resetInputVal] = useInputState(todo);

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
