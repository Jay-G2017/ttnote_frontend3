import React from "react";
import styled from "styled-components";
import {IoIosArrowForward} from 'react-icons/io';

const LeftContainer = styled.div`
  padding: 1em;
  flex: 1;
  border-right: 1px solid #fff;
  //align-items: center;
  //justify-content: center;
  display: ${props => props.visible ? 'block' : 'none'};
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
  const {isMobileView, pcHideMode, mobileShowingArea, setMobileShowingArea} = props;
  const iconStyle = {fontSize: '24px', marginBottom: '20px'};
  const visible = (isMobileView && mobileShowingArea === 'left') || (!isMobileView && !pcHideMode);

  const list = ['Inbox', 'Home', 'Work', 'Photo'];

  const renderList = (list) => {
    return (
     <ListRow
       key={list}
       onClick={() => setMobileShowingArea('middle')}
     >{list}</ListRow>
    )
  };

  return (
    <LeftContainer visible={visible} >
      {isMobileView &&
        <HeaderRow>
          <IoIosArrowForward onClick={() => setMobileShowingArea('middle')} style={iconStyle}/>
        </HeaderRow>
      }
      <div>
        {list.map(list => renderList(list))}
      </div>
    </LeftContainer>
  )
}

export default Left;