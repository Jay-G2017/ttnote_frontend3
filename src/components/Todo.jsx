import React, {useCallback, useContext, useMemo, useRef, useState} from "react";
import styled from 'styled-components';
import {IoIosPlayCircle, IoIosStar, IoIosListBox, IoIosTrash, IoIosList } from 'react-icons/io';
import {FlexBetweenRow, FlexRow, MarginRow, TTextArea} from '../common/style';
import {TomatoContext} from '../reducers/tomatoReducer';
import Tomato from "./Tomato";
import TCheckbox from "./TCheckbox";
import Overlay from 'react-bootstrap/Overlay';
import OverlayComp from "./OverlayComp";
import {Badge} from "react-bootstrap";
import {initSound} from "../utils/helper";
import CountdownCircle from "./CountdownCircle";

const TodoRowGroup = styled(MarginRow)`
  background-color: #fff;
  border-radius: ${window.ttnoteThemeLight.borderRadiusPrimary};
  padding: 0.3rem;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.1);
`;

const TodoRow = styled.div`
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
  //padding: 0.3rem 0.5rem 0.3rem 0.3rem;
  border-radius: ${window.ttnoteThemeLight.borderRadiusPrimary};
  margin-right: 0.5rem;
  color: ${props => props.done ? window.ttnoteThemeLight.textColorDesc : 'inherit'};
`;

const TomatoBadge = styled(Badge)`
  border-radius: 3px;
  visibility: ${props => props.visible === 'true' ? 'visible' : 'hidden'};
  color: ${window.ttnoteThemeLight.colorSecondary};
  //cursor: pointer;
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
  cursor: ${props => props.disabled ? '' : 'pointer'};
  :hover {
    ${props => props.disabled ? '' : "transform: scale(1.1)"};
  }
  :active {
    transform: scale(1);
  }
`;

const StarCell = styled(IoIosStar)`
  color: ${window.ttnoteThemeLight.textColorTips};
  cursor: pointer;
  :hover {
    transform: scale(1.2);
  }
  :active {
    transform: scale(1);
  }
`;

const ListTomatoCell = styled(IoIosList)`
  color: ${window.ttnoteThemeLight.textColorDesc};
  cursor: pointer;
  :hover {
    transform: scale(1.2);
  }
  :active {
    transform: scale(1);
  }
`;

const ListTomatoOpenCell = styled(IoIosListBox)`
  color: ${window.ttnoteThemeLight.colorWarn};
  cursor: pointer;
`;

const TrashCell = styled(IoIosTrash)`
  margin-right: 0.2rem;
  color: ${window.ttnoteThemeLight.textColorTips};
  cursor: pointer;
  :hover {
    transform: scale(1.2);
    color: ${window.ttnoteThemeLight.colorDanger};
  }
  :active {
    transform: scale(1);
  }
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

const OverlayContainer = styled.div`
  background-color: ${window.ttnoteThemeLight.bgColorDark};
  border-radius: ${window.ttnoteThemeLight.borderRadiusPrimary};
  padding: 0.2rem 0.7rem;
  color: ${window.ttnoteThemeLight.textColorLight};
  font-size: 0.8rem;
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
    handleNewTodo,
  } = props;
  const {
    deleteTomato,
    handleTodoDeleteWithConfirm,
    updateTodo,
    createTodo,
    cancelNewTodo,
  } = todoMethods;
  const [done, setDone] = useState(todo.done);
  const [todoName, setTodoName] = useState(todo.name);
  // const [collapse, setCollapse] = useState(true);
  const {tomatoState, tomatoDispatch} = useContext(TomatoContext);
  const moreButtonRef = useRef(null);
  const showOverlay = showMore.type === 'todo' && showMore.id === todo.id;

  const stopOnBlurFlag = useRef(false);

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
      } else {
        setTodoName(todo.name)
      }
    } else {
      handleTodoDeleteWithConfirm(todoId, titleId)
    }

  }, [tomatoSize, handleTodoDeleteWithConfirm, todo.name]);

  const handleTodoNameOnEnterPress = useCallback((e, options = {}) => {
      const value = e.currentTarget.value;
      if (value) {
        if (todo.id > 0) {
          if (todo.name !== value) {
            // update todo
            updateTodo(todo.id, {name: value});
          }
        } else {
          // create todo
          createTodo(todo.id, titleId, {name: value});
        }
        if (options.newTodo) handleNewTodo(titleId)
      } else {
        if (todo.id > 0) {
          // delete todo
          handleTodoDelete(todo.id, titleId)
        } else {
          // cancel new todo
          cancelNewTodo(todo.id, titleId)
        }
      }
      stopOnBlurFlag.current = false;
  }, [
    cancelNewTodo,
    createTodo,
    handleNewTodo,
    handleTodoDelete, titleId,
    todo.id, todo.name, updateTodo,
  ]);

  const handleTodoNameOnBlur = useCallback((e, options={newTodo: false}) => {
    if (!stopOnBlurFlag.current) {
      handleTodoNameOnEnterPress(e, options)
    }
  }, [handleTodoNameOnEnterPress]);

  return useMemo(() => {
    console.log('in todo');
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
              value={todoName}
              autoFocus={todo.id < 0}
              placeholder={'输入内容'}
              onChange={(e) => {
                const value = e.currentTarget.value;
                setTodoName(value)
              }}
              onBlur={handleTodoNameOnBlur}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  stopOnBlurFlag.current = true;
                  e.currentTarget.blur();
                  handleTodoNameOnEnterPress(e, {newTodo: true})
                }
              }}
            />
          </NameCell>

          {/*<CountCell*/}
          {/*  visible={tomatoSize > 0}*/}
          {/*  onClick={handleTodoExpand}*/}
          {/*>*/}
          {/*  <TBadge>{tomatoSize}</TBadge>*/}
          {/*</CountCell>*/}
          <PlayAndStatus>
            {tomatoState.id === todo.id ?
             <CountdownCircle tomatoMinutes={tomatoState.minutes}/>
              :
              <PlayCell
                disabled={playButtonDisabled}
                onClick={() => {
                  if (playButtonDisabled) return;
                  // window.beginAudio.play();
                  initSound();
                  const id = window.ttnoteSound.play('begin');
                  window.ttnoteSound.volume(0.7, id);
                  tomatoDispatch({
                    type: 'play',
                    payload: {id: todo.id, minutes: window.ttnote.userSetting.tomatoMinutes}
                  });
                  window.ttnote.currentTomatoUrl = window.ttnote.searchObject();
                }}
              />
            }
          </PlayAndStatus>
          {/*<MoreCell ref={moreButtonRef} onClick={e => {*/}
          {/*  e.stopPropagation();*/}
          {/*  if (showOverlay) {*/}
          {/*    setShowMore({type: 'todo', id: null})*/}
          {/*  } else {*/}
          {/*    setShowMore({type: 'todo', id: todo.id})*/}
          {/*  }*/}
          {/*}}*/}
          {/*>*/}
          {/*  <IoIosMore/>*/}
          {/*</MoreCell>*/}
          <Overlay
            show={showOverlay}
            target={moreButtonRef.current}
            placement='left'
            transition={false}
          >
            {props => (
              <OverlayComp {...props}>
                <OverlayContainer>
                  <div
                    onClick={() => handleTodoDelete(todo.id, titleId)}
                  >删除
                  </div>
                </OverlayContainer>
              </OverlayComp>
            )
            }
          </Overlay>
        </TodoRow>
        <TodoRow>
          <CheckCell style={{visibility: 'hidden'}}>
            <TCheckbox
            />
          </CheckCell>
          <FlexBetweenRow style={{flex: 'auto', marginRight: '0.4rem'}}>
          <FlexRow style={{flex: 'none', width: '2rem'}}>
            <TomatoBadge
              variant={'light'}
              visible={(tomatoSize > 0).toString()}
            >{tomatoSize}</TomatoBadge>
          </FlexRow>
          {todoExpandedKeys.includes(todo.id) ?
            <ListTomatoOpenCell
              onClick={handleTodoExpand}
            /> :
            <ListTomatoCell
              onClick={handleTodoExpand}
            />
          }
          <StarCell/>
          <TrashCell/>
          </FlexBetweenRow>
        </TodoRow>
        <TomatoGroup open={todoExpandedKeys.includes(todo.id)}>
          {tomatoes.map(tomato =>
            <Tomato
              key={tomato.id}
              tomato={tomato}
              deleteTomato={deleteTomato}
              todoDone={done}
            />)}
        </TomatoGroup>
      </TodoRowGroup>
    )
  }, [todo.id, done, todoName, handleTodoNameOnBlur, tomatoSize, handleTodoExpand, tomatoState.id, tomatoState.minutes, playButtonDisabled, showOverlay, todoExpandedKeys, tomatoes, toggleTodo, handleTodoNameOnEnterPress, tomatoDispatch, setShowMore, handleTodoDelete, titleId, deleteTomato]);
}

export default Todo;