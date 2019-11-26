import React, {useContext, useState} from "react";
import styled from 'styled-components';
import {IoIosRadioButtonOff, IoIosCheckmarkCircle, IoIosPlayCircle, IoIosMore} from 'react-icons/io';
import {TTextArea} from '../common/style';
import {TomatoContext} from '../reducers/tomatoReducer';
import Tomato from "./Tomato";
import Circle from 'react-circle';

const TodoRowGroup = styled.div`
  
`;

const TodoRow = styled.div`
  display: flex;
  align-items: center;
  
  &:active {
    background-color: #ECECEC;
  }
  padding: 0.4rem 4vw;
  @media (min-width: 576px) {
    padding: 0.3rem 6vw;
    &:active {
      background-color: transparent;
    }
  }
  border-bottom: 0.5px solid ${window.ttnoteThemeLight.lineColorLight};
  border-top: 0.5px solid ${window.ttnoteThemeLight.lineColorLight};
  margin-bottom: 0.5rem;
`;

const CheckCell = styled.div`
  font-size: 1.5rem;
  color: ${props => props.done ?
  window.ttnoteThemeLight.colorPrimary :
  window.ttnoteThemeLight.textColorDesc};

  flex: 0 0 2rem;
  display: flex;
  align-items: center;
`;

const NameCell = styled.div`
  display: flex;
  align-items: center;
  flex: auto;
`;

const PlayCell = styled(IoIosPlayCircle)`
  font-size: 1.4rem;
  color: ${props => props.disabled ? window.ttnoteThemeLight.btnDisabledBg : window.ttnoteThemeLight.primary};
  
  flex: 0 0 2rem;
`;

const CircleStyled = styled.div`
  font-size: 1.4rem;
`;

const MoreCell = styled(IoIosMore)`
  font-size: 1.4rem;
  color: ${window.ttnoteThemeLight.primaryFont};
  
  flex: 0 0 2rem;
`;


function Todo(props) {
 const  {todo} = props;
 const [done, setDone] = useState(todo.done);
 const [collapse] = useState(false);
 const {tomatoState, tomatoDispatch} = useContext(TomatoContext);
  return (
    <TodoRowGroup>
      <TodoRow>
        <CheckCell
          done={done}
          onClick={() => {
            setDone(!done);
          }}
        >
          {done ? <IoIosCheckmarkCircle/> : <IoIosRadioButtonOff />}
        </CheckCell>
        <NameCell>
          <TTextArea defaultValue={todo.name}/>
        </NameCell>
        {tomatoState.id === todo.id ?
          <Circle
            size={20}
            lineWidth={40}
            progress={tomatoState.progress}
            roundedStroke={true}
            progressColor={window.ttnoteThemeLight.colorPrimary}
            showPercentage={false}
          /> :
          <PlayCell
            disabled={tomatoState.isPlaying}
            onClick={() => {
              if (tomatoState.isPlaying) return;
              tomatoDispatch({type: 'init', payload: {id: todo.id, isPlaying: true, seconds: window.ttnote.tomatoTime * 60, progress: 1}});
              window.ttnote.currentTomatoUrl = window.ttnote.searchObject();
            }}
          />
        }

        <MoreCell />
      </TodoRow>
      {!collapse &&
        <div>
          {todo.tomatoes.map((tomato, index) =>
            <Tomato
              key={tomato.id}
              sequence={index + 1}
              tomato={tomato}
            />)}
        </div>
      }
      </TodoRowGroup>
  )
}

export default Todo;