import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import styled from "styled-components";
import {IoIosArrowBack, IoIosAlarm, IoIosCafe, IoIosRibbon} from 'react-icons/io';
import {TomatoContext} from "../reducers/tomatoReducer";
import {initSound} from "../utils/helper";
import StatusBar from "./StatusBar";
import {PaddingRow} from "../common/style";
import TomatoCountBoard from "./TomatoCountBoard";
import {ProjectContext} from "../context/projectContext";
import {ProjectsContext} from "../context/ProjectsContext";

const HeaderRow = styled(PaddingRow)`
  //backdrop-filter: blur(10px);
  height: 3.3rem;
  border-bottom: 0.5px solid ${window.ttnoteThemeLight.lineColorLight};
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  @media (min-width: 768px) {
    position: absolute;
    //width: calc(60% - 1px);
  }
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
`;

const BackCellDiv = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  margin-right: 0.6rem;
  margin-left: -2vw;
`;

const TimerActionDiv = styled.div`
  flex: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 1rem;
`;

const ShortBreakCell = styled.div`
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const IconName = styled.div`
  font-size: 0.6rem;
  font-weight: 400;
  color: ${window.ttnoteThemeLight.textColorTitle};
`;

const LongBreakCell = styled.div`
  margin-left: 1rem;
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const TodayCell = styled.div`
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

function RightHeader(props) {
  const {isMobileView} = props;
  const {tomatoState, tomatoDispatch} = useContext(TomatoContext);
  const {todayTomatoSize, createTomato} = useContext(ProjectContext);
  const {syncProject} = useContext(ProjectsContext);
  const [status, setStatus] = useState(null);


  // 注册一个listener, 来全局改变状态
  useEffect(() => {
    const handleStatusChange = (e) => {
      setStatus(e.detail);
    };

    window.addEventListener('changeStatus', handleStatusChange, false);

    return (() => {
      window.removeEventListener('changeStatus', handleStatusChange)
    })

  }, []);

  const BackCell = () => (
    <BackCellDiv>
      <IoIosArrowBack
        onClick={() => {
          const params = window.ttnote.searchObject();
          params.mobileShowingArea = 'middle';
          params.enterFrom = 'left';
          window.ttnote.goto('/note' + window.ttnote.objectToUrl(params));
        }}
      />
    </BackCellDiv>
  );

  const handleTomatoComplete = useCallback((todoId, minutes) => {
    createTomato(todoId, minutes, syncProject(tomatoState.projectId))
  }, [createTomato, syncProject, tomatoState.projectId]);

  return useMemo(() => {
    return (
      <HeaderRow className={'backdrop-blur-right'}>
        {/*mobile模式的返回按键*/}
        {isMobileView && <BackCell/>}

        <StatusBar type={status} />
        <TimerActionDiv>
          {!tomatoState.isPlaying &&
          <>
            <ShortBreakCell
              onClick={() => {
                initSound();
                window.ttnoteSound.play('begin', true);
                tomatoDispatch({type: 'takeRest', payload: {minutes: window.ttnote.userSetting.shortRestMinutes}})
              }}
            >
              <IoIosAlarm/>
              <IconName>短休息</IconName>
            </ShortBreakCell>
            <LongBreakCell
              onClick={() => {
                initSound();
                window.ttnoteSound.play('begin', true);
                tomatoDispatch({type: 'takeRest', payload: {minutes: window.ttnote.userSetting.longRestMinutes}})
              }}
            >
              <IoIosCafe/>
              <IconName>长休息</IconName>
            </LongBreakCell>
          </>
          }
          {tomatoState.isPlaying && <TomatoCountBoard onTomatoComplete={handleTomatoComplete}/>}
        </TimerActionDiv>
        <TodayCell>
          <IoIosRibbon/>
          <IconName>{`今日(${todayTomatoSize})`}</IconName>
        </TodayCell>
      </HeaderRow>
    )
  }, [handleTomatoComplete, isMobileView, status, todayTomatoSize, tomatoDispatch, tomatoState.isPlaying]);
}

export default RightHeader;
