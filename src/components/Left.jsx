import React from "react";
import styled from "styled-components";
import {IoIosArrowForward} from 'react-icons/io';

const LeftContainer = styled.div`
  flex: 1;
  border-right: 1px solid #fff;
  align-items: center;
  justify-content: center;
  display: ${props => props.visible ? 'flex' : 'none'};
`;

function Left(props) {
  const {isMobileView, pcHideMode, mobileShowingArea, setMobileShowingArea} = props;
  const iconStyle = {fontSize: '24px', marginBottom: '20px'};
  const visible = (isMobileView && mobileShowingArea === 'left') || (!isMobileView && !pcHideMode);

  return (
    <LeftContainer visible={visible} >
      <div>
        {isMobileView &&
        <IoIosArrowForward onClick={() => setMobileShowingArea('middle')} style={iconStyle}/>
        }
        <div>L</div>
      </div>
    </LeftContainer>
  )
}

export default Left;