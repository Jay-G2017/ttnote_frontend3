import React, {useCallback, useContext, useMemo, useRef, useState} from "react";
import styled from 'styled-components';
import {IoIosPlayCircle, IoIosMore} from 'react-icons/io';
import {PaddingRow, TTextArea, TBadge} from '../common/style';
import {TomatoContext} from '../reducers/tomatoReducer';
import Tomato from "./Tomato";
import Circle from 'react-circle';
import TCheckbox from "./TCheckbox";
import Countdown from "react-countdown-now";
import Overlay from 'react-bootstrap/Overlay';

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
`;

const NameCell = styled.div`
  display: flex;
  align-items: center;
  flex: auto;
  background-color: #fff;
  padding: 0.3rem;
  border-radius: ${window.ttnoteThemeLight.borderRadiusPrimary};
  margin-right: 0.4rem;
  color: ${props => props.done ? window.ttnoteThemeLight.textColorDesc : 'inherit'};
`;

const CountCell = styled.div`
  margin-right: 0.3rem;
  display: flex;
  align-items: center;
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  cursor: pointer;
`;

const PlayAndStatus = styled.div`
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  margin-right: 0.3rem;
`;

const PlayCell = styled(IoIosPlayCircle)`
  color: ${props => props.disabled ? window.ttnoteThemeLight.btnDefaultDisabledFontColor : window.ttnoteThemeLight.primary};
`;

const MoreCell = styled(IoIosMore)`
  font-size: 1.4rem;
  color: ${window.ttnoteThemeLight.primaryFont};
  
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
    testMethods,
  } = props;
  const [done, setDone] = useState(todo.done);
  // const [collapse, setCollapse] = useState(true);
  const {tomatoState, tomatoDispatch} = useContext(TomatoContext);
  const moreButtonRef = useRef(null);
  const showOverlay = showMore.type === 'todo' && showMore.id === todo.id;

  const tomatoes = todo.tomatoes || [];
  const tomatoSize = tomatoes.length;
  const tomatoSizeToMax = tomatoSize >= 9;
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

  return useMemo(() => {
    console.log('todo reRender');
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
              // todoMethods.handleTodoNameChange(todo.id, value);
              testMethods.handleTodoNameChange(todo.id, value);
            }}
            onBlur={() => todoMethods.handleTodoNameOnBlur(todo.id, titleId)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                todoMethods.handleTodoNameEnterPress(e, todo.id, titleId)
              }
            }}
          />
        </NameCell>
        <CountCell
          visible={tomatoSize > 0}
          onClick={handleTodoExpand}
        >
          <TBadge>{tomatoSize}</TBadge>
        </CountCell>
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
                  payload: {id: todo.id, minutes: window.ttnote.tomatoTime}
                });
                window.ttnote.currentTomatoUrl = window.ttnote.searchObject();
              }}
            />
          }
        </PlayAndStatus>
        <div ref={moreButtonRef} onClick={e => {
          e.stopPropagation();
          if (showOverlay) {
            setShowMore({type: 'todo', id: null})
          } else {
            setShowMore({type: 'todo', id: todo.id})
          }
        }}
        >
          <MoreCell/>
        </div>
        <Overlay
          show={showOverlay}
          target={moreButtonRef.current}
          placement='left'
          transition={false}
        >
          {({
              scheduleUpdate,
              arrowProps,
              outOfBoundaries,
              show,
              ...props,
            }) => {
            return (
              <div {...props}>Test</div>
            )
          }}
        </Overlay>
      </TodoRow>
      <TomatoGroup open={todoExpandedKeys.includes(todo.id)}>
        {tomatoes.map((tomato, index) =>
          <Tomato
            key={tomato.id}
            sequence={index + 1}
            tomato={tomato}
            deleteTomato={todoMethods.deleteTomato}
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
    // todoMethods,
    toggleTodo,
    tomatoSize,
    tomatoes,
    testMethods,
  ]);
}

export default Todo;