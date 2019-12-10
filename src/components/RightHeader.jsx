import React, {useContext, useEffect} from "react";
import styled from "styled-components";
import {IoIosArrowBack, IoIosClose, IoIosAlarm, IoIosCafe} from 'react-icons/io';
import {TomatoContext} from "../reducers/tomatoReducer";

const HeaderRow = styled.div`
  height: 3.3rem;
  border-bottom: 0.5px solid ${window.ttnoteThemeLight.lineColorLight};
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  @media (min-width: 768px) {
    width: 66.6%;
  }
  background-color: ${window.ttnoteThemeLight.bgColorPrimary};
  
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TimerRow = styled.div`
  flex: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TomatoCountCell = styled.div`
  font-size: 1.2rem;
`;

const CancelCell = styled.div`
  font-size: 2rem;
  display: contents;
`;

const BackCell = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  margin-right: 1rem;
  margin-left: -2vw;
`;

const TimerActionRow = styled.div`
  flex: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ShortBreakCell = styled.div`
  margin-right: 1rem;
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconName = styled.div`
  font-size: 0.6rem;
  color: ${window.ttnoteThemeLight.textColorTitle};
`;

const LongBreakCell = styled.div`
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function RightHeader(props) {
  const {isMobileView, createTomato} = props;
  const {tomatoState, tomatoDispatch} = useContext(TomatoContext);

  // for tomato
  useEffect(() => {
    if (!tomatoState.isPlaying) return;

    if (tomatoState.id) {
      window.timeId = setInterval(() => {
        tomatoDispatch({type: 'play', afterFinishCallback: createTomato});
      }, 1000);
    } else {
      window.timeId = setInterval(() => {
        tomatoDispatch({type: 'break'});
      }, 1000);
    }
    return () => window.timeId = clearInterval(window.timeId)
  }, [tomatoState.isPlaying, tomatoState.id, tomatoDispatch, createTomato]);

  return (
  <HeaderRow className={'t-container'}>
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
    {tomatoState.isPlaying ?
      <TimerRow>
        <TomatoCountCell onClick={()=> {
          window.ttnote.goto('/note' +  window.ttnote.objectToUrl(window.ttnote.currentTomatoUrl))
        }}>
          {getCountTime(tomatoState.seconds)}
        </TomatoCountCell>
        <CancelCell
          onClick={() => {
            tomatoDispatch({type: 'cancel'});
          }}
        >
          <IoIosClose/>
        </CancelCell>
      </TimerRow> :
      <TimerActionRow>
        <ShortBreakCell
          onClick={() => (
            tomatoDispatch({type: 'init', payload: {isPlaying: true, id: null, seconds: window.ttnote.shortBreakTime * 60}}
            )
          )}
        >
          <IoIosAlarm/>
          <IconName>短休息</IconName>
        </ShortBreakCell>
        <LongBreakCell
          onClick={() => (
            tomatoDispatch({type: 'init', payload: {isPlaying: true, id: null, seconds: window.ttnote.longBreakTime * 60}})
          )}
        >
          <IoIosCafe/>
          <IconName>长休息</IconName>
        </LongBreakCell>

      </TimerActionRow>
    }
  </HeaderRow>
  )
}

export default RightHeader;

const getCountTime = (secs) => {
  const minutes = Math.floor(secs / 60);
  const seconds = secs - minutes * 60;

  function formatTimeStr(num) {
    return num < 10 ? `0${num}` : num;
  }
  return `${formatTimeStr(minutes)} : ${formatTimeStr(seconds)}`;
};
