import React, {useCallback, useContext, useMemo, useRef, useState} from "react";
import styled from 'styled-components';
import {IoIosPlayCircle, IoIosMore} from 'react-icons/io';
import {PaddingRow, TTextArea} from '../common/style';
import {TomatoContext} from '../reducers/tomatoReducer';
import Tomato from "./Tomato";
import Circle from 'react-circle';
import TCheckbox from "./TCheckbox";
import Countdown from "react-countdown-now";
import Overlay from 'react-bootstrap/Overlay';
import OverlayComp from "./OverlayComp";
import {Badge} from "react-bootstrap";

const TodoRowGroup = styled.div`
  margin-bottom: 0.5rem;
`;

const TodoRow = styled(PaddingRow)`
  display: flex;
  align-items: center;
`;

const TomatoGroup = styled.div`
  //margin-top: 0.5rem;
  display: ${props => props.open ? 'block' : 'none'};
`;

const CheckCell = styled.div`
  font-size: 1.4rem;
  flex: none;
  display: flex;
  align-items: center;
  
  margin-right: 0.3rem;
  & label {
    margin-bottom: 0;
  }
`;

const NameCell = styled.div`
  display: flex;
  align-items: center;
  flex: auto;
  background-color: #fff;
  padding: 0.3rem 0.5rem 0.3rem 0.3rem;
  border-radius: ${window.ttnoteThemeLight.borderRadiusPrimary};
  margin-right: 0.7rem;
  color: ${props => props.done ? window.ttnoteThemeLight.textColorDesc : 'inherit'};
  position: relative;
`;

const TomatoBadge = styled(Badge)`
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 3px;
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  color: ${window.ttnoteThemeLight.colorSecondary};
`;

// const CountCell = styled.div`
//   margin-right: 0.4rem;
//   display: flex;
//   align-items: center;
//   visibility: ${props => props.visible ? 'visible' : 'hidden'};
//   cursor: pointer;
// `;

const PlayAndStatus = styled.div`
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  margin-right: 0.4rem;
`;

const PlayCell = styled(IoIosPlayCircle)`
  color: ${props => props.disabled ? window.ttnoteThemeLight.btnDefaultDisabledFontColor : window.ttnoteThemeLight.primary};
  cursor: pointer;
`;

const MoreCell = styled.div`
  font-size: 1.4rem;
  // color: ${window.ttnoteThemeLight.bgColorDark};
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${window.ttnoteThemeLight.colorSecondary};
  
  flex: none;
`;


function Todo(props) {
  const {
    todo,
    titleId,
    todoExpandedKeys,
    setTodoExpandedKeys,
    todoMethods,
    showMore,
    setShowMore,
  } = props;
  const {
    handleTodoNameChange,
    handleTodoNameOnBlur,
    handleTodoNameEnterPress,
    deleteTomato,
    handleTodoDeleteWithConfirm,
  } = todoMethods;
  const [done, setDone] = useState(todo.done);
  // const [collapse, setCollapse] = useState(true);
  const {tomatoState, tomatoDispatch} = useContext(TomatoContext);
  const moreButtonRef = useRef(null);
  const showOverlay = showMore.type === 'todo' && showMore.id === todo.id;

  const tomatoes = todo.tomatoes || [];
  const tomatoSize = tomatoes.length;
  const tomatoSizeToMax = tomatoSize >= 20;
  const playButtonDisabled = tomatoState.isPlaying || tomatoSizeToMax || todo.id < 0;

  const toggleTodo = useCallback((todoId, done) => {
    const url = window.ttnote.baseUrl + '/todos/' + todoId;
    window.ttnote.fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({done: done}),
    })
      .then(res => {
        console.log('toggle todo res:', res);
      })
      .catch(() => {
        setDone(!done)
      })

  }, []);

  const handleTodoExpand = useCallback(() => {
    const newTodoExpandedKeys = [...todoExpandedKeys];
    if (todoExpandedKeys.includes(todo.id)) {
      const index = newTodoExpandedKeys.indexOf(todo.id);
      newTodoExpandedKeys.splice(index, 1);
    } else {
      newTodoExpandedKeys.push(todo.id);
    }
    setTodoExpandedKeys(newTodoExpandedKeys);
  }, [todoExpandedKeys, setTodoExpandedKeys, todo.id]);

  const handleTodoDelete = useCallback((todoId, titleId) => {
    if (tomatoSize > 0) {
      if (window.confirm('这会删除当前任务下的所有蕃茄，确定要删除吗？')) {
        handleTodoDeleteWithConfirm(todoId, titleId)
      }
    } else {
      handleTodoDeleteWithConfirm(todoId, titleId)
    }

  }, [tomatoSize, handleTodoDeleteWithConfirm]);

  return useMemo(() => {
    console.log('todo in');
    return (
      <TodoRowGroup>
        <TodoRow>
          <CheckCell>
            <TCheckbox
              disabled={todo.id < 0}
              checked={done}
              onChange={value => {
                setDone(value);
                toggleTodo(todo.id, value);
              }}
            />
          </CheckCell>
          <NameCell done={done}>
            <TTextArea
              value={todo.name}
              autoFocus={todo.id < 0}
              placeholder={'输入内容'}
              onChange={(e) => {
                const value = e.currentTarget.value;
                handleTodoNameChange(todo.id, value);
              }}
              onBlur={() => handleTodoNameOnBlur(todo.id, titleId)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleTodoNameEnterPress(e, todo.id, titleId)
                }
              }}
            />
            <TomatoBadge
              variant={'light'}
              visible={tomatoSize > 0}
            >{tomatoSize}</TomatoBadge>
          </NameCell>
          {/*<CountCell*/}
          {/*  visible={tomatoSize > 0}*/}
          {/*  onClick={handleTodoExpand}*/}
          {/*>*/}
          {/*  <TBadge>{tomatoSize}</TBadge>*/}
          {/*</CountCell>*/}
          <PlayAndStatus>
            {tomatoState.id === todo.id ?
              <Countdown
                date={Date.now() + tomatoState.minutes * 60 * 1000}
                renderer={({total}) => {
                  const tomatoTime = tomatoState.minutes * 60 * 1000;
                  const progress = Math.round((tomatoTime - total) / tomatoTime * 100);
                  return (
                    <Circle
                      size={21}
                      lineWidth={40}
                      progress={progress || 1}
                      roundedStroke={true}
                      progressColor={window.ttnoteThemeLight.colorPrimary}
                      showPercentage={false}
                    />
                  )
                }}
              />
              :
              <PlayCell
                disabled={playButtonDisabled}
                onClick={() => {
                  if (playButtonDisabled) return;
                  window.beginAudio.play();
                  tomatoDispatch({
                    type: 'play',
                    payload: {id: todo.id, minutes: window.ttnote.userSetting.tomatoMinutes}
                  });
                  window.ttnote.currentTomatoUrl = window.ttnote.searchObject();
                }}
              />
            }
          </PlayAndStatus>
          <MoreCell ref={moreButtonRef} onClick={e => {
            e.stopPropagation();
            if (showOverlay) {
              setShowMore({type: 'todo', id: null})
            } else {
              setShowMore({type: 'todo', id: todo.id})
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
                  onClick={() => handleTodoDelete(todo.id, titleId)}
                >删除</div>
              </OverlayComp>
            )
            }
          </Overlay>
        </TodoRow>
        <TomatoGroup open={todoExpandedKeys.includes(todo.id)}>
          {tomatoes.map((tomato, index) =>
            <Tomato
              key={tomato.id}
              sequence={index + 1}
              tomato={tomato}
              deleteTomato={deleteTomato}
            />)}
        </TomatoGroup>
      </TodoRowGroup>
    )
  }, [
    showOverlay,
    setShowMore,
    done,
    setDone,
    tomatoState,
    tomatoDispatch,
    handleTodoExpand,
    playButtonDisabled,
    titleId,
    todo,
    todoExpandedKeys,
    handleTodoNameChange,
    handleTodoNameEnterPress,
    handleTodoNameOnBlur,
    deleteTomato,
    toggleTodo,
    tomatoSize,
    tomatoes,
    handleTodoDelete,
  ]);
}

export default Todo;