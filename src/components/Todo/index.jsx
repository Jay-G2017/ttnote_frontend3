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
  const { todo } = props;

  const [open, setOpen] = useState(false);

  const renderChildren = () => {
    if (open) {
      if (props.children) {
        return <ChildrenContent>{props.children}</ChildrenContent>;
      } else {
        return <ChildrenContent>没有蕃茄</ChildrenContent>;
      }
    } else {
      return null;
    }
  };

  return (
    <TodoGroup>
      <TodoRow>
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
