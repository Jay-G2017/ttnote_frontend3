import React, {useContext, useState} from "react";
import styled from 'styled-components';
import {IoIosRadioButtonOff, IoIosCheckmarkCircle, IoIosPlayCircle, IoIosMore, IoIosStopwatch} from 'react-icons/io';
import {TInput} from '../common/style';
import {TomatoContext} from '../reducers/tomatoReducer';
import Tomato from "./Tomato";

const TodoRow = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 17px;
  font-weight: 400;
 &:active {
   background-color: #ECECEC;
 }
`;

const IsPlayingCell = styled.div`
  font-size: 20px;
  position: absolute;
  top: 0.7em;
  left: -0.1em;
  color: ${window.ttnoteThemeLight.primary};
`;

const CheckCell = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  color: ${props => props.done ?
  window.ttnoteThemeLight.primary :
  window.ttnoteThemeLight.primaryActiveBackground
};
  margin-right: 1em;
`;

const NameCell = styled.div`
`;

const ActionsBar = styled.div`
  display: flex;
  align-items: center;
`;

const PlayCell = styled.div`
  font-size: 20px;
  color: ${props => props.disabled ? window.ttnoteThemeLight.btnDisabledBg : window.ttnoteThemeLight.primary};
  margin-right: 1em;
`;

const MoreCell = styled.div`
  font-size: 20px;
  color: ${window.ttnoteThemeLight.primaryFont};
`;


function Todo(props) {
 const  {todo} = props;
 const [done, setDone] = useState(todo.done);
 const [collapse] = useState(false);
 const {tomatoState, tomatoDispatch} = useContext(TomatoContext);
  return (
    <div style={{padding: '16px 32px'}}>
      <TodoRow>
       {tomatoState.id === todo.id &&
       <IsPlayingCell>
        <IoIosStopwatch/>
       </IsPlayingCell>
       }
        <CheckCell
          done={done}
          onClick={() => {
            setDone(!done);
          }}
        >
          {done ? <IoIosCheckmarkCircle/> : <IoIosRadioButtonOff />}
        </CheckCell>
        <NameCell>
         <TInput defaultValue={todo.name}/>
        </NameCell>
        <ActionsBar>
          <PlayCell
            disabled={tomatoState.isPlaying}
            onClick={() => {
              if (tomatoState.isPlaying) return;
              tomatoDispatch({type: 'init', payload: {id: todo.id, isPlaying: true, seconds: window.ttnote.tomatoTime * 60}});
              window.ttnote.currentTomatoUrl = window.ttnote.searchObject();
            }}
          >
            <IoIosPlayCircle/>
          </PlayCell>
          <MoreCell>
            <IoIosMore/>
          </MoreCell>
        </ActionsBar>
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
      </div>
  )
}

export default Todo;