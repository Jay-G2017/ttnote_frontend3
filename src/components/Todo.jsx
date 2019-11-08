import React, {useState} from "react";
import styled from 'styled-components';
import {IoIosRadioButtonOff, IoIosCheckmarkCircle, IoIosPlayCircle, IoIosMore, IoIosStopwatch} from 'react-icons/io';
import {TInput} from '../common/style';

const TodoRow = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 16px 32px;
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
 const  {todo, playStatus, setPlayStatus} = props;
 const [done, setDone] = useState(todo.done);
  return (
    <TodoRow>
     {playStatus.id === todo.id &&
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
          disabled={playStatus.isPlaying}
          onClick={() => {
            if (playStatus.isPlaying) return;
            setPlayStatus({id: todo.id, isPlaying: true, minutes: window.ttnote.tomatoTime});
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
  )
}

export default Todo;