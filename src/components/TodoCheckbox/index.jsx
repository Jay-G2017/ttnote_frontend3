import React, { useState, useCallback } from 'react';
import { CheckCell } from './styles';
import api from '../../api/index';

function TodoCheckbox(props) {
  const { defaultValue, todoId } = props;

  const [checked, setChecked] = useState(defaultValue);

  const updateTodo = useCallback((todoId, value) => {
    api
      .editTodo(todoId, { done: value })
      .then((res) => { })
      .catch(() => {
        setChecked(!value);
      });
  }, []);

  const handleOnClick = useCallback(
    () => {
      setChecked(!checked);
      updateTodo(todoId, !checked);
    },
    [checked, todoId, updateTodo]
  );

  return (
    <CheckCell onClick={handleOnClick}>
      {checked ?
        <div>checked</div> :
        <div>not</div>
      }
    </CheckCell>
  );
}

TodoCheckbox.defaultProps = {
  defaultValue: false,
};

export default TodoCheckbox;
