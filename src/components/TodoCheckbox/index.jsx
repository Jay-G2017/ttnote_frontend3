import React, { useState, useCallback } from 'react';
import api from '../../api/index';
import styles from './styles.module.css';
import { IoIosCheckmark } from 'react-icons/io';

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

  const handleOnClick = useCallback(
    (e) => {
      e.stopPropagation();
      setChecked(!checked);
      updateTodo(todoId, !checked);
    },
    [checked, todoId, updateTodo]
  );

  return (
    <div className={styles.checkCell}>
      <div className={styles.circle} onClick={handleOnClick}>
        {checked ? <IoIosCheckmark className={styles.checkIcon} /> : null}
      </div>
    </div>
  );
}

TodoCheckbox.defaultProps = {
  defaultValue: false,
};

export default TodoCheckbox;
