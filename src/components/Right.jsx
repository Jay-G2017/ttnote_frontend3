import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {IoIosArrowBack, IoIosArrowDroprightCircle, IoIosClose, IoIosAlarm, IoIosCafe} from 'react-icons/io';
import {CSSTransition} from 'react-transition-group';
import {FormControl} from 'react-bootstrap';
import Title from "./Title";
import Todo from "./Todo";

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
  const [project, setProject] = useState({});
  const [noProject, setNoProject] = useState(false);
  const projectId = window.ttnote.searchObject().projectId;

  const fetchProject = (projectId) => {
   const url = window.ttnote.baseUrl + '/projects/' + projectId;
   window.ttnote.fetch(url)
     .then(res => {
        setProject(res);
     })
  };

  useEffect(()=> {
    if (projectId) {
      setNoProject(false);
      fetchProject(projectId);
    } else {
      setNoProject(true);
      setProject({})
    }
  }, [projectId]);


  window.ttnote.tomatoTime = 2 * 60;
  const [playStatus, setPlayStatus] = useState({
    id: null,
    isPlaying: false,
    minutes: window.ttnote.tomatoTime
  });

  useEffect(() => {
    if (playStatus.isPlaying) {
      window.timeId = setInterval(() => {
        setPlayStatus(prevStatus => {
          return {...prevStatus, minutes: prevStatus.minutes - 1}
        });
      }, 1000);
      return () => window.timeId = clearInterval(window.timeId)
    }
  }, [playStatus.isPlaying]);

  useEffect(() => {
    if (playStatus.minutes <=0 && window.timeId) {
      window.timeId = clearInterval(window.timeId);
      setPlayStatus({id: null, isPlaying: false, minutes: window.ttnote.tomatoTime});
    }
  }, [playStatus.minutes]);

  const getCountTime = () => {
    const minutes = Math.floor(playStatus.minutes / 60);
    const seconds = playStatus.minutes - minutes * 60;

    function formatTimeStr(num) {
      return num < 10 ? `0${num}` : num;
    }
    return `${formatTimeStr(minutes)} : ${formatTimeStr(seconds)}`;
  };

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
          {playStatus.isPlaying ?
            <TimerRow>
              <div onClick={()=> {
                window.ttnote.goto('/note' +  window.ttnote.objectToUrl(window.ttnote.currentTomatoUrl))
              }}>
                {getCountTime()}
              </div>
              <CancelCell
                onClick={() => {
                  setPlayStatus({...playStatus, ...{id: null, isPlaying: false}});
                  window.timeId = clearInterval(window.timeId);
                }}
              >
                <IoIosClose/>
              </CancelCell>
            </TimerRow> :
            <TimerActionRow>
              <ShortBreakCell
                onClick={() => setPlayStatus({isPlaying: true, id: null, minutes: 5 * 60})}
              >
                <IoIosAlarm/>
                <div>短休息</div>
              </ShortBreakCell>
              <LongBreakCell
                onClick={() => setPlayStatus({isPlaying: true, id: null, minutes: 15 * 60})}
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
                playStatus={playStatus}
                setPlayStatus={setPlayStatus}
              />
            )}
            {project.titles && project.titles.map(title =>
              <Title
                key={title.id}
                title={title}
                playStatus={playStatus}
                setPlayStatus={setPlayStatus}
              />
            )}
          </div>
        }
      </RightContainer>
    </CSSTransition>
  )
}

export default Right;