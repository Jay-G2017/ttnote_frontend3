import React, {useCallback, useContext, useMemo, useRef} from "react";
import styled from "styled-components";
import {IoIosArrowBack, IoIosClose, IoIosAlarm, IoIosCafe, IoIosRibbon} from 'react-icons/io';
import {TomatoContext} from "../reducers/tomatoReducer";
import Countdown, {zeroPad} from 'react-countdown-now';

const HeaderRow = styled.div`
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
  //background-color: ${window.ttnoteThemeLight.bgColorDefaultRgba};
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
`;

const TimerRow = styled.div`
  flex: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TomatoCountCell = styled.div`
  font-size: 1.2rem;
  flex: 0 0 4rem;
  cursor: ${props => props.tomatoOn ? 'pointer' : 'auto'};
`;

const TomatoInfoCell = styled.div`
  flex: 0 0 5rem;
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
  cursor: pointer;
`;

const IconName = styled.div`
  font-size: 0.6rem;
  font-weight: 400;
  color: ${window.ttnoteThemeLight.textColorTitle};
`;

const LongBreakCell = styled.div`
  margin-right: 1rem;
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
  const {isMobileView, createTomato, todayTomatoSize} = props;
  const {tomatoState, tomatoDispatch} = useContext(TomatoContext);
  const countdownRef = useRef(null);

  const handleTomatoComplete = useCallback((todoId) => {
    document.title = "🍅 蕃茄时光 | Tomato Time";
    createTomato(todoId);
    window.dingDingAudio.play();
    if (window.ttnote.userSetting.autoRest) {
      tomatoDispatch({type: 'takeRest', payload: {minutes: window.ttnote.userSetting.shortRestMinutes}});
      countdownRef.current.start();
    }
  }, [tomatoDispatch, createTomato]);

  const handleRestComplete = useCallback(() => {
    document.title = "🍅 蕃茄时光 | Tomato Time";
    tomatoDispatch({type: 'cancel'});
    window.restAudio.play();
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

  return useMemo(() => {
    return (
      <HeaderRow className={'t-container backdrop-blur-right'}>
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
            <TomatoCountCell
              tomatoOn={!!tomatoState.id}
              onClick={() => {
                if (tomatoState.id)
                  window.ttnote.goto('/note' + window.ttnote.objectToUrl(window.ttnote.currentTomatoUrl))
            }}>
              <Countdown
                ref={countdownRef}
                date={Date.now() + tomatoState.minutes * 60 * 1000}
                renderer={({minutes, seconds}) => {
                  document.title = `${zeroPad(minutes)}:${zeroPad(seconds)}`;
                  return(
                    <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>
                  );
                }}
                onComplete={() => {
                  if (tomatoState.id) {
                    handleTomatoComplete(tomatoState.id)
                  } else {
                    handleRestComplete()
                  }
                }}
              />
            </TomatoCountCell>
            {tomatoState.id ? <TomatoInfoCell>蕃茄中...</TomatoInfoCell> : <TomatoInfoCell>休息中...</TomatoInfoCell>}
            <CancelCell
              onClick={() => {
                document.title = "🍅 蕃茄时光 | Tomato Time";
                tomatoDispatch({type: 'cancel'});
              }}
            >
              <IoIosClose/>
            </CancelCell>
          </TimerRow> :
          <TimerActionRow>
            <ShortBreakCell
              onClick={() => {
                window.beginAudio.play();
                tomatoDispatch({type: 'takeRest', payload: {minutes: window.ttnote.userSetting.shortRestMinutes}})
              }}
            >
              <IoIosAlarm/>
              <IconName>短休息</IconName>
            </ShortBreakCell>
            <LongBreakCell
              onClick={() => {
                window.beginAudio.play();
                tomatoDispatch({type: 'takeRest', payload: {minutes: window.ttnote.userSetting.longRestMinutes}})
              }}
            >
              <IoIosCafe/>
              <IconName>长休息</IconName>
            </LongBreakCell>
            <TodayCell>
              <IoIosRibbon/>
              <IconName>{`今日(${todayTomatoSize})`}</IconName>
            </TodayCell>

          </TimerActionRow>
        }
      </HeaderRow>
    )
  }, [
    handleTomatoComplete,
    tomatoState.id,
    tomatoState.isPlaying,
    tomatoState.minutes,
    handleRestComplete,
    isMobileView,
    tomatoDispatch,
    todayTomatoSize,
  ]);
}

export default RightHeader;
