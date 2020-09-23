import React, { useCallback, useState } from 'react';
import {
  TodoGroup,
  TodoRow,
  ChildrenContent,
  TodoInputStyled,
  TodoCheckboxStyled,
} from './styles';
import TodoCheckbox from '../TodoCheckbox';
import TodoInput from '../TodoInput';
import styles from './styles.module.css';

function Todo(props) {
  const { todo, style } = props;

  const [open, setOpen] = useState(false);

  const renderChildren = () => {
    if (open) {
      if (props.children) {
        return <ChildrenContent open={open}>{props.children}</ChildrenContent>;
      } else {
        return <ChildrenContent open={open}>没有蕃茄</ChildrenContent>;
      }
    } else {
      return null;
    }
  };

  const toggleOpen = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <TodoGroup style={{ ...style }}>
      <TodoRow open={open}>
        <TodoCheckbox defaultValue={todo.done} todoId={todo.id} />
        {/* <TodoCheckboxStyled onClick={() => setOpen(!open)}></TodoCheckboxStyled> */}
        <TodoInputStyled>
          <TodoInput defaultValue={todo.name} todoId={todo.id} />
        </TodoInputStyled>
        <div className={styles.toolbarCell} onClick={toggleOpen}></div>
      </TodoRow>
      {renderChildren()}
    </TodoGroup>
  );
}

export default Todo;
