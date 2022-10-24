import { Checkbox } from '@material-ui/core';

import EditTodoForm from '../TodoForm/EditFormTodo';

import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import useToggleState from '../../hooks/useToggleState';

import { memo } from 'react';

import styles from '../TodoList/todo.module.css';

import { ITodo } from '../../types/Todo';
import { useTodoEditMutationQuery } from '../../hooks/useEditTodoOptimisticMutation';
import { useTodoDeleteMutationQuery } from '../../hooks/useDeleteTodoOptimisticMutation';

function Todo({ id, isCompleted, todo }: ITodo) {
  console.log('todo', id);

  const { mutate: mutateEdit } = useTodoEditMutationQuery();
  const { mutate: deleteEdit } = useTodoDeleteMutationQuery();

  const [isEdit, setIsEdit, resetIsEdit] = useToggleState(false);
  const handleEdit = () => {
    setIsEdit();
  };

  if (isEdit) {
    return (
      <EditTodoForm
        mutate={mutateEdit}
        resetIsEdit={resetIsEdit}
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
            onClick={async () => {
              // editTodo에서 isCompleted,id,todo를 옵셔널하게 받을 수 있는 방법을 생각해봐라
              mutateEdit({ id, isCompleted: !isCompleted });
            }}
          />
          <span>{todo}</span>
        </div>
        <div>
          <IconButton
            className={styles.deleteBtn}
            onClick={() => {
              deleteEdit(id);
            }}
          >
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
