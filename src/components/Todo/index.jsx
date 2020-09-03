import React, { useState } from 'react';
import {
  TodoGroup,
  TodoRow,
  ChildrenContent,
  TodoInputStyled,
  TodoCheckboxStyled,
} from './styles';
import TodoCheckbox from '../TodoCheckbox';
import TodoInput from '../TodoInput';

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

  return (
    <TodoGroup style={{ ...style }}>
      <TodoRow open={open}>
        <TodoCheckboxStyled onClick={() => setOpen(!open)}>
          <TodoCheckbox defaultValue={todo.done} todoId={todo.id} />
        </TodoCheckboxStyled>
        <TodoInputStyled>
          <TodoInput defaultValue={todo.name} todoId={todo.id} />
        </TodoInputStyled>
      </TodoRow>
      {renderChildren()}
    </TodoGroup>
  );
}

export default Todo;
