import React, {useContext, useState} from "react";
import styled from 'styled-components';
import {IoIosRadioButtonOff, IoIosCheckmarkCircle, IoIosPlayCircle, IoIosMore} from 'react-icons/io';
import {PaddingRow, TTextArea, TBadge} from '../common/style';
import {TomatoContext} from '../reducers/tomatoReducer';
import Tomato from "./Tomato";
import Circle from 'react-circle';

const TodoRowGroup = styled.div`
  margin-bottom: 0.5rem;
`;

const TodoRow = styled(PaddingRow)`
  display: flex;
  align-items: center;
`;

const TomatoGroup = styled.div`
  margin-top: 0.5rem;
  display: ${props => props.collapse ? 'none' : 'block'};
`;

const CheckCell = styled.div`
  font-size: 1.4rem;
  color: ${props => props.done ?
  window.ttnoteThemeLight.colorPrimary :
  window.ttnoteThemeLight.textColorDesc};

  flex: none;
  display: flex;
  align-items: center;
  
  margin-right: 0.3rem;
`;

const NameCell = styled.div`
  display: flex;
  align-items: center;
  flex: auto;
  background-color: #fff;
  padding: 0.3rem;
  border-radius: ${window.ttnoteThemeLight.borderRadiusPrimary};
  margin-right: 0.4rem;
`;

const CountCell = styled.div`
  margin-right: 0.3rem;
  display: flex;
  align-items: center;
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  cursor: pointer;
`;

const PlayAndStatus = styled.div`
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  margin-right: 0.3rem;
`;

const PlayCell = styled(IoIosPlayCircle)`
  color: ${props => props.disabled ? window.ttnoteThemeLight.btnDisabledBg : window.ttnoteThemeLight.primary};
`;

const MoreCell = styled(IoIosMore)`
  font-size: 1.4rem;
  color: ${window.ttnoteThemeLight.primaryFont};
  
  flex: none;
`;


function Todo(props) {
  const {todo} = props;
  const [done, setDone] = useState(todo.done);
  const [collapse, setCollapse] = useState(true);
  const {tomatoState, tomatoDispatch} = useContext(TomatoContext);

  const tomatoSize = todo.tomatoes.length;
  const tomatoSizeToMax = tomatoSize >= 9;
  return (
    <TodoRowGroup>
      <TodoRow>
        <CheckCell
          done={done}
          onClick={() => {
            setDone(!done);
          }}
        >
          {done ? <IoIosCheckmarkCircle/> : <IoIosRadioButtonOff/>}
        </CheckCell>
        <NameCell>
          <TTextArea defaultValue={todo.name}/>
        </NameCell>
        <CountCell
          visible={tomatoSize > 0}
          onClick={() => setCollapse(!collapse)}
        >
          <TBadge>{tomatoSize}</TBadge>
        </CountCell>
        <PlayAndStatus>
          {tomatoState.id === todo.id ?
            <Circle
              size={21}
              lineWidth={40}
              progress={tomatoState.progress}
              roundedStroke={true}
              progressColor={window.ttnoteThemeLight.colorPrimary}
              showPercentage={false}
            /> :
            <PlayCell
              disabled={tomatoState.isPlaying || tomatoSizeToMax}
              onClick={() => {
                if (tomatoState.isPlaying) return;
                tomatoDispatch({
                  type: 'init',
                  payload: {id: todo.id, isPlaying: true, seconds: window.ttnote.tomatoTime * 60, progress: 1}
                });
                window.ttnote.currentTomatoUrl = window.ttnote.searchObject();
              }}
            />
          }
        </PlayAndStatus>
        <MoreCell/>
      </TodoRow>
      <TomatoGroup collapse={collapse}>
        {todo.tomatoes.map((tomato, index) =>
          <Tomato
            key={tomato.id}
            sequence={index + 1}
            tomato={tomato}
          />)}
      </TomatoGroup>
    </TodoRowGroup>
  )
}

export default Todo;