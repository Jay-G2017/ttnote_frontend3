import React from 'react';
import { TodoGroup, TodoRow, ChildrenContent } from './styles';
import TodoCheckbox from '../TodoCheckbox';

function Todo(props) {
  const { todo } = props;
  return (
    <TodoGroup>
      <TodoRow>
        <TodoCheckbox defaultValue={todo.done} todoId={todo.id} />
        <div>{todo.name}</div>
      </TodoRow>
      <ChildrenContent></ChildrenContent>
    </TodoGroup>
  );
}

export default Todo;
