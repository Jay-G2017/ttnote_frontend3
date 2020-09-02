import React, { useState, useCallback } from 'react';
import { TTextArea } from '../../common/style';
import api from '../../api/index';

function TodoInput(props) {
  const { defaultValue, todoId } = props;

  const [value, setValue] = useState(defaultValue);

  const updateTodo = useCallback((todoId, data) => {
    api
      .editTodo(todoId, data)
      .then((res) => {})
      .catch(() => {});
  }, []);

  const handleOnBlur = useCallback(
    (e) => {
      const $value = e.currentTarget.value;
      if (value !== $value) updateTodo(todoId, { name: $value });
    },
    [todoId, updateTodo, value]
  );

  return (
    <TTextArea
      value={value}
      autoFocus={todoId < 0}
      placeholder={'输入内容'}
      onChange={(e) => {
        const value = e.currentTarget.value;
        setValue(value);
      }}
      onBlur={handleOnBlur}
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          e.currentTarget.blur();
        }
      }}
    />
  );
}

TodoInput.defaultProps = {
  defaultValue: '',
};

export default TodoInput;
