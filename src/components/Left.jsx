import React, {useEffect, useState} from "react";
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

  const [categories, setCategories] = useState([]);

  const fetchCategories = () => {
    const url = window.ttnote.baseUrl + '/categories';
    window.ttnote.fetch(url)
      .then(res => {
        console.log(res);
        setCategories(res);
      })
  };

  useEffect(() => {
    fetchCategories()
  }, []);

  const renderList = (list) => {
    return (
     <ListRow
       key={list.id}
       onClick={() => {
         // setMobileShowingArea('middle');
         const params = window.ttnote.searchObject();
         params.categoryId = list.id;
         if (isMobileView) {
           params.mobileShowingArea = 'middle';
           params.enterFrom = 'right';
         }
         window.ttnote.goto('/note' + window.ttnote.objectToUrl(params));
       }}
     >{list.name}</ListRow>
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
                if (isMobileView) {
                  const params = window.ttnote.searchObject();
                  params.mobileShowingArea = 'middle';
                  params.enterFrom = 'right';
                  window.ttnote.goto('/note' + window.ttnote.objectToUrl(params));
                }
              }}
              style={iconStyle}
            />
          </HeaderRow>
        }
        <div>
          {renderList({id: -1, name: 'Inbox'})}
          {categories.map(list => renderList(list))}
        </div>
      </LeftContainer>
    </CSSTransition>
  )
}

export default Left;