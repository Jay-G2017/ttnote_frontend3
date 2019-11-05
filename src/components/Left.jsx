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
  background: ${props => props.active ? window.ttnoteThemeLight.primaryActiveBackground : '' };
  color: ${window.ttnoteThemeLight.primaryFont};
  border-radius: ${window.ttnoteThemeLight.primaryBorderRadius};
`;

function Left(props) {
  const {isMobileView, pcHideMode, mobileShowingArea} = props;
  const iconStyle = {fontSize: '24px', marginBottom: '20px'};
  const visible = (isMobileView && mobileShowingArea === 'left') || (!isMobileView && !pcHideMode);

  const [categories, setCategories] = useState([]);

  const searchParams = window.ttnote.searchObject();
  const categoryId = parseInt(searchParams.categoryId);

  useEffect(() => {
    const categoryId = parseInt(window.ttnote.searchObject().categoryId);
    const fetchCategories = () => {
      const url = window.ttnote.baseUrl + '/categories';
      window.ttnote.fetch(url)
        .then(res => {
          setCategories(res);
          if (!categoryId) {
            const params = window.ttnote.searchObject();
            params.categoryId = -1;
            window.ttnote.goto('/note' + window.ttnote.objectToUrl(params));
          }
        })
    };

    fetchCategories()
  }, []);

  const renderList = (list) => {
    const active = list.id === categoryId;
    return (
     <ListRow
       active={active}
       key={list.id}
       onClick={() => {
         if (active && !isMobileView) {
           return;
         }

         const params = window.ttnote.searchObject();
         if (!active) {
           params.categoryId = list.id;
           delete params.projectId;
         }

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