import React, {useCallback, useRef} from "react";
import styled from "styled-components";
import Todo from "./Todo";
import {PaddingRow, TTextArea, TBadge} from '../common/style';
import {IoIosMore} from 'react-icons/io';
import Overlay from "react-bootstrap/Overlay";
import OverlayComp from "./OverlayComp";

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
  background-color: ${window.ttnoteThemeLight.colorSecondary};
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
  margin-left: -0.3rem;
  flex: auto;
  color: ${window.ttnoteThemeLight.colorSecondary};
  font-size: 1rem;
  font-weight: 700;
`;

const CountCell = styled(TBadge)`
  flex: none;
  margin-right: 0.3rem;
  background-color: ${window.ttnoteThemeLight.bgColorDefault};
  color: ${window.ttnoteThemeLight.textColorTitle};
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
`;

const MoreCell = styled.div`
  font-size: 1.4rem;
  // color: ${window.ttnoteThemeLight.bgColorDark};
  display: flex;
  align-items: center;
  cursor: pointer;
  flex: none;
`;

const TodoBoard = styled.div`

`;

function Title(props) {
  const {
    title,
    playStatus,
    setPlayStatus,
    todos,
    todoMethods,
    titleMethods,
    showMore,
    setShowMore,
  } = props;

  const {handleTitleDeleteWithConfirm} = titleMethods;

  const moreButtonRef = useRef(null);
  const showOverlay = showMore.type === 'title' && showMore.id === title.id;

  let tomatoCount = 0;
  (title.todoIds || []).forEach(todoId => {
   const tSize = todos[todoId].tomatoes ? todos[todoId].tomatoes.length : 0;
    tomatoCount += tSize;
  });

  const todoSize = title.todoIds ? title.todoIds.length : 0;

  const handleTitleDelete = useCallback(() => {
    if (todoSize > 0) {
      if (window.confirm('这会删除当前组下的所有任务，确定要删除吗？')) {
        handleTitleDeleteWithConfirm(title.id)
      }
    } else {
      handleTitleDeleteWithConfirm(title.id)
    }
  }, [handleTitleDeleteWithConfirm, title.id, todoSize]);

  return (
    <TitleContainer>
      <TitleRow>
        <VerticalLine/>
        <NameCell>
          <TTextArea
            value={title.name}
            autoFocus={title.id < 0}
            placeholder={'输入内容'}
            onChange={(e) => {
              const value = e.currentTarget.value;
              titleMethods.handleTitleNameChange(title.id, value);
            }}
            // onBlur={() => handleTodoNameOnBlur(todo.id, titleId)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                titleMethods.handleTitleNameEnterPress(e, title.id)
              }
            }}
          />
        </NameCell>
        <CountCell visible={tomatoCount > 0}>{tomatoCount}</CountCell>
        <MoreCell ref={moreButtonRef} onClick={e => {
          e.stopPropagation();
          if (showOverlay) {
            setShowMore({type: 'title', id: null})
          } else {
            setShowMore({type: 'title', id: title.id})
          }
        }}
        >
          <IoIosMore/>
        </MoreCell>
        <Overlay
          show={showOverlay}
          target={moreButtonRef.current}
          placement='left'
          transition={false}
        >
          {props => (
            <OverlayComp {...props}>
              <div
                onClick={handleTitleDelete}
              >删除</div>
            </OverlayComp>
          )
          }
        </Overlay>
      </TitleRow>
      <TodoBoard>
        {(title.todoIds || []).map(todoId =>
          <Todo
            key={todoId}
            todo={todos[todoId]}
            playStatus={playStatus}
            setPlayStatus={setPlayStatus}
            titleId={title.id}
            todoExpandedKeys={props.todoExpandedKeys}
            setTodoExpandedKeys={props.setTodoExpandedKeys}
            todoMethods={todoMethods}
            showMore={showMore}
            setShowMore={setShowMore}
          />)}
      </TodoBoard>
    </TitleContainer>
  )

}

export default Title;