import React from "react";
import {IoIosRadioButtonOff, IoIosCheckmarkCircle} from 'react-icons/io';
import styled from 'styled-components';

const LabelStyled = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  input {
    position: absolute; 
    left: -9999em;
  }
  input:checked + svg {
    color: ${window.ttnoteThemeLight.colorPrimary};
  }
  
  input + svg {
    color: ${window.ttnoteThemeLight.textColorTips};
  }`;

function TCheckbox(props) {
  const {checked, onChange, disabled} = props;
  return (
    <LabelStyled>
      <input
        type={'checkbox'}
        disabled={disabled}
        checked={checked}
        onChange={e => {
          const value = e.currentTarget.checked;
          onChange(value);
        }}
      />
      {checked ?
        <IoIosCheckmarkCircle/> :
        <IoIosRadioButtonOff/>
      }
    </LabelStyled>
  )

}

TCheckbox.defaultProps = {
  disabled: false,
};

export default TCheckbox;