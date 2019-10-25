import React from "react";
import styled from "styled-components";
import {IoIosMenu, IoIosArrowDropleftCircle} from 'react-icons/io';

const MiddleContainer = styled.div`
  flex: 1;
  border-right: 1px solid #fff;
  align-items: center;
  justify-content: center;
  display: ${props => props.visible ? 'flex' : 'none'};
  transition: width 1s;
`;

function Middle(props) {
  const {isMobileView, pcHideMode, setPcHideMode, mobileShowingArea, setMobileShowingArea} = props;
  const iconStyle = {fontSize: '24px', marginBottom: '20px'};
  const visible = (isMobileView && mobileShowingArea === 'middle') || (!isMobileView && !pcHideMode);

  return (
    <MiddleContainer visible={visible}>
      <div>
        {isMobileView &&
        <IoIosMenu onClick={() => setMobileShowingArea('left')} style={iconStyle}/>
        }
        <div>M</div>
        {!isMobileView &&
        <IoIosArrowDropleftCircle onClick={() => setPcHideMode(true)} style={iconStyle}/>
        }
      </div>
    </MiddleContainer>
  )
}

export default Middle;