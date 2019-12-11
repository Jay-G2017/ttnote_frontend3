import React, {useCallback, useContext} from "react";
import styled from "styled-components";
import {IoIosArrowBack, IoIosClose, IoIosAlarm, IoIosCafe} from 'react-icons/io';
import {TomatoContext} from "../reducers/tomatoReducer";
import Countdown, {zeroPad} from 'react-countdown-now';
import BreakSound from '../audio/BreakSound.mp3'
import {Howl} from 'howler';
import DingSound from '../audio/DingSound.mp3';
import DingDingSound from '../audio/DingDingSound.mp3';
import {enableSound} from "../utils/helper";

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

  const handleTomatoComplete = useCallback((todoId) => {
    createTomato(todoId);
    tomatoDispatch({type: 'cancel'});
    new Howl({src: DingDingSound}).play();

  }, [tomatoDispatch, createTomato]);

  const handleRestComplete = useCallback(() => {
    tomatoDispatch({type: 'cancel'});
    new Howl({src: BreakSound}).play();
  }, [tomatoDispatch]);

  // for tomato
  // useEffect(() => {
  //   if (!tomatoState.isPlaying) return;
  //
  //   if (tomatoState.id) {
  //     window.timeId = setInterval(() => {
  //       tomatoDispatch({type: 'play', afterFinishCallback: createTomato});
  //     }, 1000);
  //   } else {
  //     window.timeId = setInterval(() => {
  //       tomatoDispatch({type: 'break'});
  //     }, 1000);
  //   }
  //   return () => window.timeId = clearInterval(window.timeId)
  // }, [tomatoState.isPlaying, tomatoState.id, tomatoDispatch, createTomato]);

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
          <Countdown
            date={Date.now() + tomatoState.minutes * 60 * 1000}
            renderer={({ minutes, seconds }) => <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>}
            onComplete={() => {
              if (tomatoState.id) {
                handleTomatoComplete(tomatoState.id)
              } else {
                handleRestComplete()
              }
            }}
          />
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
          onClick={() => {
            enableSound();
            tomatoDispatch({type: 'takeRest', payload: {minutes: window.ttnote.shortBreakTime}}
          )}}
        >
          <IoIosAlarm/>
          <IconName>短休息</IconName>
        </ShortBreakCell>
        <LongBreakCell
          onClick={() => {
            enableSound();
            tomatoDispatch({type: 'takeRest', payload: {minutes: window.ttnote.longBreakTime}})
          }}
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
