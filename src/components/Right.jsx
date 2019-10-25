import React from "react";
import styled from "styled-components";
import {IoIosArrowBack, IoIosArrowDroprightCircle} from 'react-icons/io';

const RightContainer = styled.div`
  flex: 4;
  align-items: center;
  justify-content: center;
  display: ${props => props.visible ? 'flex' : 'none'};
`;

function Right(props) {
  const {isMobileView, pcHideMode, setPcHideMode, mobileShowingArea, setMobileShowingArea} = props;
  const iconStyle = {fontSize: '24px', marginBottom: '20px'};
  const visible = (isMobileView && mobileShowingArea === 'right') || !isMobileView;

  return (
    <RightContainer visible={visible}>
      <div>
        {isMobileView &&
        <IoIosArrowBack onClick={() => setMobileShowingArea('middle')} style={iconStyle}/>
        }
        {!isMobileView && pcHideMode &&
          <IoIosArrowDroprightCircle onClick={() => setPcHideMode(false)}/>
        }
        <div>R</div>
      </div>
    </RightContainer>
  )
}

export default Right;