import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Tooltip } from 'antd';
import styled, { keyframes } from 'styled-components';
import {
  IoIosPlayCircle,
  IoIosStar,
  IoIosListBox,
  IoIosTrash,
  IoIosList,
} from 'react-icons/io';
import {
  FlexBetweenRow,
  FlexRow,
  MarginRow,
  TTextArea,
  OverlayItem,
  VLine,
} from '../common/style';
import { TomatoContext } from '../reducers/tomatoReducer';
import Tomato from './Tomato';
import TCheckbox from './TCheckbox';
import { Badge } from 'react-bootstrap';
import { initSound } from '../utils/helper';
import 'antd/lib/tooltip/style/index.css';
import { ProjectsContext } from '../context/ProjectsContext';
import TomatoProgressCircle from './TomatoProgressCircle';
import { ProjectContext } from '../context/projectContext';
const projectId = window.ttnote.searchObject().projectId;

const TodoRowGroup = styled(MarginRow)`
  background-color: #fff;
  border-radius: ${window.ttnoteThemeLight.borderRadiusPrimary};
  padding: 0.3rem;
  //box-shadow: 1px 1px 3px rgba(0,0,0,0.1);
`;

const TodoRow = styled.div`
  display: flex;
  align-items: center;
  padding-right: 0.4rem;
`;

const TodoInfoRow = styled(FlexBetweenRow)`
  padding-left: 1.7rem; //1.4 + 0.3
  padding-right: 0.4rem;
  padding-top: 0.3rem;
  // padding-bottom: 0.2rem;
`;

const TomatoGroup = styled.div`
  display: ${(props) => (props.open ? 'block' : 'none')};
  margin-top: 0.3rem;
  margin-left: 1.7rem; // 1.4 + 0.3
  margin-right: 0.4rem;
`;

const CheckCell = styled.div`
  font-size: 1.4rem;
  flex: none;
  display: flex;
  align-items: center;
  user-select: none;

  margin-right: 0.3rem;
  & label {
    margin-bottom: 0;
  }
`;

const NameCell = styled.div`
  display: flex;
  align-items: center;
  flex: auto;
  padding: 0.2rem;
  border-radius: ${window.ttnoteThemeLight.borderRadiusPrimary};
  margin-right: 1rem;
  color: ${(props) =>
    props.done ? window.ttnoteThemeLight.textColorDesc : 'inherit'};
`;

const TomatoBadge = styled(Badge)`
  border-radius: 3px;
  visibility: ${(props) => (props.visible === 'true' ? 'visible' : 'hidden')};
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
`;

const PlayCell = styled(IoIosPlayCircle)`
  color: ${(props) =>
    props.disabled
      ? window.ttnoteThemeLight.btnDefaultDisabledFontColor
      : window.ttnoteThemeLight.primary};
  cursor: ${(props) => (props.disabled ? '' : 'pointer')};
  :hover {
    ${(props) => (props.disabled ? '' : 'transform: scale(1.1)')};
  }
  :active {
    transform: scale(1);
  }
`;

const starEffect = keyframes`
  0% {transform: scale(1) }
  10% {transform: scale(1.6) translate(0, -5px)}
  90% {transform: scale(0.8) translate(0, 2px)}
  100% {transform: scale(1) translate(0, 0)}
`;

const StarCell = styled(IoIosStar)`
  color: ${(props) => {
    if (props.disabled) {
      return window.ttnoteThemeLight.btnDefaultDisabledFontColor;
    } else {
      return props.starred === 'true'
        ? window.ttnoteThemeLight.textColorWarn
        : window.ttnoteThemeLight.textColorTips;
    }
  }};
  cursor: ${(props) => (props.disabled ? '' : 'pointer')};
  &.star-effect {
    animation: ${starEffect} 300ms ease-in-out;
  }
`;

const ListTomatoCell = styled(IoIosList)`
  color: ${window.ttnoteThemeLight.textColorDesc};
  visibility: ${(props) => (props.visible === 'true' ? 'visible' : 'hidden')};
  cursor: pointer;
  user-select: none;
`;

const ListTomatoOpenCell = styled(IoIosListBox)`
  color: ${window.ttnoteThemeLight.colorWarn};
  cursor: pointer;
  visibility: ${(props) => (props.visible === 'true' ? 'visible' : 'hidden')};
  user-select: none;
`;

const TrashCell = styled(IoIosTrash)`
  margin-right: 0.2rem;
  color: ${window.ttnoteThemeLight.textColorTips};
  cursor: pointer;
  :hover {
    color: ${window.ttnoteThemeLight.colorDanger};
  }
`;

function Todo(props) {
  const {
    todo,
    titleId,
    todoExpandedKeys,
    setTodoExpandedKeys,
    todoMethods,
    handleNewTodo,
  } = props;
  const {
    deleteTomato,
    handleTodoDeleteWithConfirm,
    handleStarRemove,
    updateTodo,
    createTodo,
    cancelNewTodo,
  } = todoMethods;
  const [done, setDone] = useState(todo.done);
  const firstMount = useRef(true);
  const [todayTodo, setTodayTodo] = useState(todo.starred || false);
  const [todoName, setTodoName] = useState(todo.name);
  const [todoDeleteTooltipVisible, setTodoDeleteTooltipVisible] = useState(
    false
  );
  // const [collapse, setCollapse] = useState(true);
  const { tomatoState, tomatoDispatch } = useContext(TomatoContext);

  const { syncProject } = useContext(ProjectsContext);
  const { fetchProject } = useContext(ProjectContext);

  const stopOnBlurFlag = useRef(false);

  const tomatoes = todo.tomatoes || [];
  const tomatoSize = tomatoes.length;
  const tomatoSizeToMax = tomatoSize >= 20;
  const playButtonDisabled =
    tomatoState.isPlaying || tomatoSizeToMax || todo.id < 0;

  const tomatoOpen = todoExpandedKeys.includes(todo.id);

  const getTooltipText = useCallback(() => {
    if (tomatoState.isPlaying && tomatoState.id) {
      return '正在蕃茄中';
    } else if (tomatoState.isPlaying) {
      return '正在休息中';
    } else if (tomatoSizeToMax) {
      return '最多20个蕃茄';
    } else {
      return null;
    }
  }, [tomatoSizeToMax, tomatoState]);

  const toggleTodo = useCallback(
    (todoId, done) => {
      const url = window.ttnote.baseUrl + '/todos/' + todoId;
      window.ttnote
        .fetch(url, {
          method: 'PATCH',
          body: JSON.stringify({ done: done }),
        })
        .then((res) => {
          fetchProject();
        })
        .catch(() => {
          setDone(!done);
        });
    },
    [fetchProject]
  );

  const handleStarClick = useCallback(() => {
    const prevTodayTodo = todayTodo;
    setTodayTodo(!todayTodo);
    const url = window.ttnote.baseUrl + `/todos/${todo.id}/tag_today_todo`;
    window.ttnote
      .fetch(url, {
        method: 'PATCH',
        body: JSON.stringify({ starred: !todayTodo }),
      })
      .catch((res) => {
        setTodayTodo(prevTodayTodo);
      });

    // star从有到无的时候，如果在`今日任务`界面下，要把那个todo移除
    if (prevTodayTodo) handleStarRemove(todo.id, titleId, syncProject);
  }, [handleStarRemove, syncProject, titleId, todayTodo, todo.id]);

  useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
    } else {
      if (todayTodo) {
        document
          .getElementById('todayTodo' + todo.id)
          .classList.add('star-effect');
      } else {
        document
          .getElementById('todayTodo' + todo.id)
          .classList.remove('star-effect');
      }
    }
  }, [todayTodo, todo.id]);

  const handleTodoExpand = useCallback(() => {
    if (tomatoOpen) {
      setTodoExpandedKeys((keys) => {
        const result = [];
        keys.forEach((key) => {
          if (key !== todo.id) result.push(key);
        });
        return result;
      });
    } else {
      setTodoExpandedKeys((keys) => keys.concat(todo.id));
    }
  }, [tomatoOpen, setTodoExpandedKeys, todo.id]);

  const handleTodoClose = useCallback(() => {
    setTodoExpandedKeys((keys) => {
      const result = [];
      keys.forEach((key) => {
        if (key !== todo.id) result.push(key);
      });
      return result;
    });
  }, [setTodoExpandedKeys, todo.id]);

  const handleTodoDelete = useCallback(
    (todoId, titleId) => {
      if (tomatoSize > 0) {
        if (window.confirm('这会删除当前任务下的所有蕃茄，确定要删除吗？')) {
          handleTodoDeleteWithConfirm(todoId, titleId, syncProject);
        } else {
          setTodoName(todo.name);
        }
      } else {
        handleTodoDeleteWithConfirm(todoId, titleId);
      }
    },
    [tomatoSize, handleTodoDeleteWithConfirm, syncProject, todo.name]
  );

  const handleTodoNameOnEnterPress = useCallback(
    (e, options = {}) => {
      const value = e.currentTarget.value;
      if (value) {
        if (todo.id > 0) {
          if (todo.name !== value) {
            // update todo
            updateTodo(todo.id, { name: value });
          }
        } else {
          // create todo
          createTodo(todo.id, titleId, { name: value });
        }
        if (options.newTodo) handleNewTodo(titleId);
      } else {
        if (todo.id > 0) {
          // delete todo
          handleTodoDelete(todo.id, titleId);
        } else {
          // cancel new todo
          cancelNewTodo(todo.id, titleId);
        }
      }
      stopOnBlurFlag.current = false;
    },
    [
      cancelNewTodo,
      createTodo,
      handleNewTodo,
      handleTodoDelete,
      titleId,
      todo.id,
      todo.name,
      updateTodo,
    ]
  );

  const handleTodoNameOnBlur = useCallback(
    (e, options = { newTodo: false }) => {
      if (!stopOnBlurFlag.current) {
        handleTodoNameOnEnterPress(e, options);
      }
    },
    [handleTodoNameOnEnterPress]
  );

  const TodoDeleteOverlay = useCallback(
    () => (
      <FlexRow style={{ height: '100%' }}>
        <OverlayItem
          type="danger"
          onClick={() => {
            handleTodoDelete(todo.id, titleId);
            setTodoDeleteTooltipVisible(false);
          }}
        >
          确认删除
        </OverlayItem>
        <VLine />
        <OverlayItem
          onClick={() => setTodoDeleteTooltipVisible(false)}
        ></OverlayItem>
      </FlexRow>
    ),
    [handleTodoDelete, titleId, todo.id]
  );

  return useMemo(() => {
    console.log('in todo');
    return (
      <TodoRowGroup>
        <TodoRow>
          <CheckCell>
            <TCheckbox
              disabled={todo.id < 0}
              checked={done}
              onChange={(value) => {
                setDone(value);
                handleTodoClose();
                toggleTodo(todo.id, value);
              }}
            />
          </CheckCell>
          <NameCell
            done={done}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                window.ttnoteThemeLight.bgColorWhiteDarker;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'inherit';
            }}
          >
            <TTextArea
              value={todoName}
              autoFocus={todo.id < 0}
              placeholder={'输入内容'}
              onChange={(e) => {
                const value = e.currentTarget.value;
                setTodoName(value);
              }}
              onBlur={handleTodoNameOnBlur}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  stopOnBlurFlag.current = true;
                  e.currentTarget.blur();
                  e.currentTarget.parentNode.style.backgroundColor = 'inherit';
                  handleTodoNameOnEnterPress(e, { newTodo: true });
                }
              }}
            />
          </NameCell>

          <PlayAndStatus>
            {tomatoState.id === todo.id ? (
              <TomatoProgressCircle />
            ) : (
              <Tooltip title={getTooltipText()} trigger="hover">
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
                      payload: {
                        id: todo.id,
                        minutes: window.ttnote.userSetting.tomatoMinutes,
                        projectId,
                      },
                    });
                    window.ttnote.currentTomatoUrl = window.ttnote.searchObject();
                  }}
                />
              </Tooltip>
            )}
          </PlayAndStatus>
        </TodoRow>
        <TodoInfoRow>
          <FlexRow
            style={{
              flex: 'none',
              width: '2rem',
              cursor: 'pointer',
              userSelect: 'none',
            }}
            onClick={handleTodoExpand}
          >
            <TomatoBadge
              variant={'light'}
              visible={(tomatoSize > 0).toString()}
            >
              {tomatoSize}
            </TomatoBadge>
          </FlexRow>
          {tomatoOpen ? (
            <ListTomatoOpenCell
              visible={(tomatoSize > 0).toString()}
              onClick={handleTodoExpand}
            />
          ) : (
            <ListTomatoCell
              visible={(tomatoSize > 0).toString()}
              onClick={handleTodoExpand}
            />
          )}
          <StarCell
            id={`todayTodo${todo.id}`}
            starred={todayTodo.toString()}
            disabled={false}
            onClick={handleStarClick}
          />
          <Tooltip
            placement={'left'}
            trigger={'click'}
            title={<TodoDeleteOverlay />}
            visible={todoDeleteTooltipVisible}
            onVisibleChange={(visible) => {
              setTodoDeleteTooltipVisible(visible);
            }}
          >
            <TrashCell />
          </Tooltip>
        </TodoInfoRow>
        <TomatoGroup open={tomatoOpen}>
          {tomatoes.map((tomato) => (
            <Tomato
              key={tomato.id}
              tomato={tomato}
              deleteTomato={deleteTomato}
              todoDone={done}
            />
          ))}
        </TomatoGroup>
      </TodoRowGroup>
    );
  }, [
    todo.id,
    done,
    todoName,
    handleTodoNameOnBlur,
    tomatoState.id,
    getTooltipText,
    playButtonDisabled,
    handleTodoExpand,
    tomatoSize,
    tomatoOpen,
    todayTodo,
    handleStarClick,
    todoDeleteTooltipVisible,
    tomatoes,
    handleTodoClose,
    toggleTodo,
    handleTodoNameOnEnterPress,
    tomatoDispatch,
    deleteTomato,
  ]);
}

export default Todo;
