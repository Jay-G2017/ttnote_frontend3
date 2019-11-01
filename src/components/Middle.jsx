import React from "react";
import styled from "styled-components";
import {IoIosMenu, IoIosArrowDropleftCircle} from 'react-icons/io';
import {CSSTransition} from "react-transition-group";

const MiddleContainer = styled.div`
  padding: 1em;
  flex: 1;
  border-left: 1px solid #fff;
  //align-items: center;
  //justify-content: center;
  overflow: auto;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
`;

const ListRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
  &:hover {
   cursor: pointer;
  }

`;

function Middle(props) {
  const {isMobileView, pcHideMode, setPcHideMode, mobileShowingArea} = props;
  const iconStyle = {fontSize: '24px', marginBottom: '20px'};
  const visible = (isMobileView && mobileShowingArea === 'middle') || (!isMobileView && !pcHideMode);

  const enterFrom = window.ttnote.searchObject().enterFrom || 'left';


  let list = [];
  for(let i = 0; i < 16; i++) {
    list.push('Project' + i);
  }

  const renderList = (list) => {
    return(
      <ListRow
        key={list}
        onClick={() => {
          // setMobileShowingArea('right');
          window.ttnote.goto('/note?mobileShowingArea=right');
        }}
      >
        {list}
      </ListRow>
    )
  };

  return (
    <CSSTransition
      in={visible}
      timeout={300}
      classNames={enterFrom === 'left' ? 'enter-from-left' : 'enter-from-right'}
      unmountOnExit
      exit={false}
    >
      <MiddleContainer visible={visible}>
        <HeaderRow>
          {isMobileView &&
            <IoIosMenu
              onClick={() => {
                // setMobileShowingArea('left');
                window.ttnote.goto('/note?mobileShowingArea=left');
              }}
              style={iconStyle}
            />
          }
          {!isMobileView &&
            <IoIosArrowDropleftCircle
              onClick={() => {
                setPcHideMode(true);
              }}
              style={iconStyle}
            />
          }
        </HeaderRow>
        <div>
          {list.map(row => renderList(row))}
        </div>
      </MiddleContainer>
    </CSSTransition>
  )
}

export default Middle;