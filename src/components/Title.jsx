import React from "react";
import styled from "styled-components";
import Todo from "./Todo";

const TitleContainer = styled.div`
  background-color: #fff;
  margin: 1em 0;
`;

const TitleRow = styled.div`
  display: flex;
  border-bottom: 1px solid #ededed;
`;

const TodoBoard = styled.div`

`;

function Title(props) {
  const {title, playStatus, setPlayStatus} = props;

  return (
    <TitleContainer>
      <TitleRow>{title.name}</TitleRow>
      <TodoBoard>
        {title.todos.map(todo =>
          <Todo
            key={todo.id}
            todo={todo}
            playStatus={playStatus}
            setPlayStatus={setPlayStatus}
          />)}
      </TodoBoard>
    </TitleContainer>
  )

}

export default Title;