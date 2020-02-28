import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import styled from "styled-components";
import {IoIosArrowBack, IoIosCloseCircle, IoIosAlarm, IoIosCafe, IoIosRibbon} from 'react-icons/io';
import {TomatoContext} from "../reducers/tomatoReducer";
import {initSound} from "../utils/helper";
import CountdownTimer from "./CountdownTimer";
import StatusBar from "./StatusBar";
import {PaddingRow, VLine} from "../common/style";

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

const TomatoCountBoardDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 8rem;
`;

const TomatoCountBoardLeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const TomatoCountCell = styled.div`
  font-size: 1.2rem;
  width: 4rem;
  text-align: center;
  cursor: ${props => props.tomatoOn ? 'pointer' : 'auto'};
`;

const TomatoInfoCell = styled.div`
  font-size: 0.8rem;
`;

const CancelCell = styled.div`
  font-size: 1.8rem;
  display: contents;
  color: ${props => props.type === 'danger' ? window.ttnoteThemeLight.colorDanger : 'inherit'};
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
  const {isMobileView, createTomato, todayTomatoSize} = props;
  const {tomatoState, tomatoDispatch} = useContext(TomatoContext);
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

  const handleTomatoComplete = useCallback((todoId, minutes) => {
    document.title = "蕃茄时光 | Tomato Time";
    window.ttnoteSound.play('complete', false);
    createTomato(todoId, minutes);
    if (window.ttnote.userSetting.autoRest) {
      tomatoDispatch({type: 'takeRest', payload: {minutes: window.ttnote.userSetting.shortRestMinutes}});
    } else {
      tomatoDispatch({type: 'cancel'});
    }
  }, [createTomato, tomatoDispatch]);

  const handleRestComplete = useCallback(() => {
    document.title = "蕃茄时光 | Tomato Time";
    tomatoDispatch({type: 'cancel'});
    window.ttnoteSound.play('rest', false);
  }, [tomatoDispatch]);

  const handleComplete = useCallback(() => {
    if (tomatoState.id) {
      handleTomatoComplete(tomatoState.id, tomatoState.minutes)
    } else {
      handleRestComplete()
    }
  }, [
    handleRestComplete,
    handleTomatoComplete,
    tomatoState.id,
    tomatoState.minutes]);

  const TomatoCountBoard = useCallback(() => (
    <TomatoCountBoardDiv>
      <TomatoCountBoardLeftDiv>
        <TomatoCountCell
          tomatoOn={!!tomatoState.id}
          onClick={() => {
            if (tomatoState.id)
              window.ttnote.goto('/note' + window.ttnote.objectToUrl(window.ttnote.currentTomatoUrl))
          }}>
          <CountdownTimer
            key={tomatoState.id}
            tomatoMinutes={tomatoState.minutes}
            onComplete={handleComplete}
          />
        </TomatoCountCell>
        <TomatoInfoCell>{tomatoState.id ? '蕃茄中...' : '休息中...'}</TomatoInfoCell>
      </TomatoCountBoardLeftDiv>
      <VLine/>
      <CancelCell
        type={tomatoState.id ? 'danger' : 'default'}
        onClick={() => {
          document.title = "蕃茄时光 | Tomato Time";
          tomatoDispatch({type: 'cancel'});
        }}
      >
        <IoIosCloseCircle/>
      </CancelCell>
    </TomatoCountBoardDiv>
  ), [handleComplete, tomatoDispatch, tomatoState.id, tomatoState.minutes]);

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
          {tomatoState.isPlaying && <TomatoCountBoard/>}
        </TimerActionDiv>
        <TodayCell>
          <IoIosRibbon/>
          <IconName>{`今日(${todayTomatoSize})`}</IconName>
        </TodayCell>
      </HeaderRow>
    )
  }, [isMobileView, status, todayTomatoSize, tomatoDispatch, tomatoState.isPlaying]);
}

export default RightHeader;
