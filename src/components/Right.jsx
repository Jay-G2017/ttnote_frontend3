import React, {useEffect, useContext} from "react";
import styled from "styled-components";
import {IoIosArrowBack, IoIosArrowDroprightCircle, IoIosClose, IoIosAlarm, IoIosCafe} from 'react-icons/io';
import {CSSTransition} from 'react-transition-group';
import {FormControl} from 'react-bootstrap';
import Title from "./Title";
import Todo from "./Todo";
import useProject from "../hooks/useProject";
import {TomatoContext} from '../reducers/tomatoReducer';

const RightContainer = styled.div`
  padding: 1em;
  flex: 4;
  border-left: 1px solid #fff;
  //align-items: center;
  //justify-content: center;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  height: 3em;
`;

const TimerRow = styled.div`
  flex: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CancelCell = styled.div`
  font-size: 20px;
`;

const BackCell = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  margin-right: 1em;
`;

const TimerActionRow = styled.div`
  flex: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ShortBreakCell = styled.div`
  margin-right: 1em;
`;

const LongBreakCell = styled.div`

`;

function Right(props) {
  const {isMobileView, pcHideMode, setPcHideMode, mobileShowingArea} = props;
  const visible = (isMobileView && mobileShowingArea === 'right') || !isMobileView;

  const projectId = window.ttnote.searchObject().projectId;
  const {project, noProject, postToCreateTomato} = useProject(projectId);


  window.ttnote.tomatoTime = 10;

  const {tomatoState, tomatoDispatch} = useContext(TomatoContext);

  // for tomato
  useEffect(() => {
    if (!tomatoState.isPlaying) return;

    if (tomatoState.id) {
      window.timeId = setInterval(() => {
        tomatoDispatch({type: 'play', afterFinishCallback: postToCreateTomato});
      }, 1000);
    } else {
      window.timeId = setInterval(() => {
        tomatoDispatch({type: 'break'});
      }, 1000);
    }
    return () => window.timeId = clearInterval(window.timeId)
  }, [tomatoState.isPlaying, tomatoState.id, tomatoDispatch, postToCreateTomato]);

  return (
    <CSSTransition
      component={null}
      in={visible}
      timeout={300}
      exit={false}
      unmountOnExit
      classNames='enter-from-right'
    >
      <RightContainer>
        <HeaderRow>
          {isMobileView &&
            <BackCell>
              <IoIosArrowBack
                onClick={() => {
                  const params = window.ttnote.searchObject();
                  params.mobileShowingArea = 'middle';
                  params.enterFrom = 'left';
                  window.ttnote.goto('/note' + window.ttnote.objectToUrl(params));
                }}
              />
            </BackCell>
          }
          {!isMobileView && pcHideMode &&
          <IoIosArrowDroprightCircle onClick={() => setPcHideMode(false)}/>
          }
          {tomatoState.isPlaying ?
            <TimerRow>
              <div onClick={()=> {
                window.ttnote.goto('/note' +  window.ttnote.objectToUrl(window.ttnote.currentTomatoUrl))
              }}>
                {getCountTime(tomatoState.seconds)}
              </div>
              <CancelCell
                onClick={() => {
                  // setPlayStatus({...playStatus, ...{id: null, isPlaying: false}});
                  tomatoDispatch({type: 'cancel'});
                  window.timeId = clearInterval(window.timeId);
                }}
              >
                <IoIosClose/>
              </CancelCell>
            </TimerRow> :
            <TimerActionRow>
              <ShortBreakCell
                onClick={() => (
                  tomatoDispatch({type: 'init', payload: {isPlaying: true, id: null, seconds: window.ttnote.shortBreakTime}}
                  )
                  )}
              >
                <IoIosAlarm/>
                <div>短休息</div>
              </ShortBreakCell>
              <LongBreakCell
                onClick={() => tomatoDispatch({type: 'init', payload: {isPlaying: true, id: null, seconds: window.ttnote.longBreakTime}})}
              >
                <IoIosCafe/>
                <div>长休息</div>
              </LongBreakCell>

            </TimerActionRow>
          }
        </HeaderRow>
        {noProject ? <div>no project</div> :
          <div>
            <div>{project.name}</div>
            <FormControl as="textarea" aria-label="With textarea" value={project.desc} />
            {project.todos && project.todos.map(todo =>
              <Todo
                key={todo.id}
                todo={todo}
              />
            )}
            {project.titles && project.titles.map(title =>
              <Title
                key={title.id}
                title={title}
              />
            )}
          </div>
        }
      </RightContainer>
    </CSSTransition>
  )
}

export default Right;

const getCountTime = (secs) => {
  const minutes = Math.floor(secs / 60);
  const seconds = secs - minutes * 60;

  function formatTimeStr(num) {
    return num < 10 ? `0${num}` : num;
  }
  return `${formatTimeStr(minutes)} : ${formatTimeStr(seconds)}`;
};
