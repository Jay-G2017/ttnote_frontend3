import React from "react";
import styled from "styled-components";
import Todo from "./Todo";
import {PaddingRow, TTextArea, TBadge} from '../common/style';
import {IoIosMore} from 'react-icons/io';

const TitleContainer = styled.div`
  //background-color: #fff;
  margin-bottom: 1rem;
`;

const TitleRow = styled(PaddingRow)`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  //border-left: 0.2rem solid ${window.ttnoteThemeLight.colorPrimary};
`;

const VerticalLine = styled.div`
  height: 1rem;
  width: 0.2rem;
  border-radius: 0.05rem;
  background-color: ${window.ttnoteThemeLight.colorPrimary};
  position: absolute;
  left: 0;
  @media (min-width: 576px) {
    //padding: 0.3rem 6vw;
    left: 5vw
  }
`;

const NameCell = styled.div`
  display: flex;
  align-items: center;
  padding: 0.3rem;
  flex: auto;
`;

const CountCell = styled(TBadge)`
  flex: none;
  margin-right: 0.3rem;
  background-color: ${window.ttnoteThemeLight.bgColorDefault};
  color: ${window.ttnoteThemeLight.textColorTitle};
`;

const MoreCell = styled(IoIosMore)`
  font-size: 1.4rem;
  color: ${window.ttnoteThemeLight.primaryFont};
  
  flex: none;
`;

const TodoBoard = styled.div`

`;

function Title(props) {
  const {title, playStatus, setPlayStatus} = props;

  return (
    <TitleContainer>
      <TitleRow>
        <VerticalLine/>
        <NameCell>
          <TTextArea defaultValue={title.name}/>
        </NameCell>
        <CountCell>13</CountCell>
        <MoreCell/>
      </TitleRow>
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