import React, { useState, useCallback } from 'react';
import { CheckCell } from './styles';
import TCheckbox from '../TCheckbox';
import api from '../../api/index';

function TodoCheckbox(props) {
  const { defaultValue, todoId } = props;

  const [checked, setChecked] = useState(defaultValue);

  const updateTodo = useCallback((todoId, value) => {
    api
      .editTodo(todoId, { done: value })
      .then((res) => {})
      .catch(() => {
        setChecked(!value);
      });
  }, []);

  const handleOnChange = useCallback(
    (value) => {
      setChecked(value);
      updateTodo(todoId, value);
    },
    [todoId, updateTodo]
  );

  return (
    <CheckCell>
      <TCheckbox checked={checked} onChange={handleOnChange} />
    </CheckCell>
  );
}

TodoCheckbox.defaultProps = {
  defaultValue: false,
};

export default TodoCheckbox;
