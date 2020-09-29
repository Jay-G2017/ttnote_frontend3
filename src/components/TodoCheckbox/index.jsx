import React, { useState, useCallback } from 'react';
import api from '../../api/index';
import styles from './styles.less';
import { IoIosRadioButtonOff, IoIosCheckmarkCircle } from 'react-icons/io';

function TodoCheckbox(props) {
  const { defaultValue, todoId, onChange } = props;

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

      if (onChange) onChange(!checked);
    },
    [checked, onChange, todoId, updateTodo]
  );

  return (
    <div className={styles.checkCell} onClick={handleOnClick}>
      {checked ? (
        <IoIosCheckmarkCircle className={styles.checkIcon} />
      ) : (
        <IoIosRadioButtonOff className={styles.circleIcon} />
      )}
    </div>
  );
}

TodoCheckbox.defaultProps = {
  defaultValue: false,
};

export default TodoCheckbox;
