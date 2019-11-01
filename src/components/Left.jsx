import React from "react";
import styled from "styled-components";
import {IoIosArrowForward} from 'react-icons/io';
import {CSSTransition} from 'react-transition-group';

const LeftContainer = styled.div`
  padding: 1em;
  flex: 1;
  //align-items: center;
  //justify-content: center;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ListRow = styled.div`
  padding: 1em;
 &:hover {
 cursor: pointer;
 }
`;

function Left(props) {
  const {isMobileView, pcHideMode, mobileShowingArea} = props;
  const iconStyle = {fontSize: '24px', marginBottom: '20px'};
  const visible = (isMobileView && mobileShowingArea === 'left') || (!isMobileView && !pcHideMode);

  const list = ['Inbox', 'Home', 'Work', 'Photo'];

  const renderList = (list) => {
    return (
     <ListRow
       key={list}
       onClick={() => {
         // setMobileShowingArea('middle');
         window.ttnote.goto('/note?mobileShowingArea=middle&enterFrom=right')
       }}
     >{list}</ListRow>
    )
  };

  return (
    <CSSTransition
      in={visible}
      timeout={300}
      classNames={'enter-from-left'}
      exit={false}
      unmountOnExit
    >
      <LeftContainer>
        {isMobileView &&
          <HeaderRow>
            <IoIosArrowForward
              onClick={() => {
                // setMobileShowingArea('middle');
                window.ttnote.goto('/note?mobileShowingArea=middle&enterFrom=right');
              }}
              style={iconStyle}
            />
          </HeaderRow>
        }
        <div>
          {list.map(list => renderList(list))}
        </div>
      </LeftContainer>
    </CSSTransition>
  )
}

export default Left;