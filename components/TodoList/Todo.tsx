import { Checkbox } from '@material-ui/core';

import EditTodoForm from '../TodoForm/EditFormTodo';

import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import useToggleState from '../../hooks/useToggleState';

import { memo } from 'react';

import styles from '../TodoList/todo.module.css';

import { ITodo } from '../../types/Todo';

function Todo({ id, isCompleted, todo }: ITodo) {
  const [isEdit, setIsEdit, resetIsEdit] = useToggleState(false);
  const handleEdit = () => {
    setIsEdit();
  };

  if (isEdit) {
    return (
      <EditTodoForm
        resetIsEdit={resetIsEdit}
        isCompleted={isCompleted}
        todo={todo}
        id={id}
      />
    );
  } else {
    return (
      <li className={styles.itemContainer} key={id}>
        <div
          className={styles.itemFront}
          style={{ textDecoration: `${isCompleted ? 'line-through' : 'none'}` }}
        >
          <Checkbox
            tabIndex={-1}
            checked={isCompleted}
            onClick={async () => {}}
          />
          <span>{todo}</span>
        </div>
        <div>
          <IconButton className={styles.deleteBtn} onClick={() => {}}>
            <DeleteIcon />
          </IconButton>
          <IconButton className={styles.editBtn} onClick={handleEdit}>
            <EditIcon />
          </IconButton>
        </div>
      </li>
    );
  }
}

export default memo(Todo);
