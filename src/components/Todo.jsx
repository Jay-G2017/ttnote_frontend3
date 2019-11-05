import React from "react";
import styled from 'styled-components';

const TodoRow = styled.div`
  display: flex;
`;

function Todo(props) {
 const  {todo} = props;
  return (
    <TodoRow>
      <div>{todo.name}</div>
    </TodoRow>
  )
}

export default Todo;