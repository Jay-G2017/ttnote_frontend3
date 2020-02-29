import React, {useCallback, useContext, useMemo} from "react";
import CountdownTimer from "./CountdownTimer";
import {VLine} from "../common/style";
import styled from "styled-components";
import {TomatoContext} from "../reducers/tomatoReducer";
import {IoIosCloseCircle} from 'react-icons/io';

const TomatoCountBoardDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 0 1 9rem;
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

function TomatoCountBoard(props) {
  const {onTomatoComplete} = props;
  const {tomatoState, tomatoDispatch} = useContext(TomatoContext);

  const handleTomatoComplete = useCallback((todoId, minutes) => {
    document.title = "蕃茄时光 | Tomato Time";
    window.ttnoteSound.play('complete', false);
    onTomatoComplete(todoId, minutes);
    if (window.ttnote.userSetting.autoRest) {
      tomatoDispatch({type: 'takeRest', payload: {minutes: window.ttnote.userSetting.shortRestMinutes}});
    } else {
      tomatoDispatch({type: 'cancel'});
    }
  }, [
    onTomatoComplete,
    tomatoDispatch]);

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

  return useMemo(() => {
    console.log('in count board');
    return (
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
    )
  }, [handleComplete, tomatoDispatch, tomatoState.id, tomatoState.minutes])
}

export default TomatoCountBoard;