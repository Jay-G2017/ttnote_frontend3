import React from "react";
import styled from "styled-components";
import {IoIosMenu, IoIosArrowDropleftCircle} from 'react-icons/io';
import {CSSTransition} from "react-transition-group";
import useProjects from "../hooks/useProjects";

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
  background: ${props => props.active ? window.ttnoteThemeLight.primaryActiveBackground : '' };
  border-radius: ${window.ttnoteThemeLight.primaryBorderRadius};
`;

function Middle(props) {
  const {isMobileView, pcHideMode, setPcHideMode, mobileShowingArea} = props;
  const iconStyle = {fontSize: '24px', marginBottom: '20px'};
  const visible = (isMobileView && mobileShowingArea === 'middle') || (!isMobileView && !pcHideMode);

  const searchObject = window.ttnote.searchObject();
  const enterFrom = searchObject.enterFrom || 'left';
  const categoryId = parseInt(searchObject.categoryId) || -1;
  const projectId = parseInt(searchObject.projectId);
  const {projects} = useProjects(categoryId);

  const renderList = (project) => {
    const active = project.id === projectId;
    return(
      <ListRow
        active={active}
        key={project.id}
        onClick={() => {
          if (active && !isMobileView) return;
          const params = window.ttnote.searchObject();
          params.projectId = project.id;
          if (isMobileView) {
            params.mobileShowingArea = 'right';
            delete params.enterFrom;
          }
          window.ttnote.goto('/note' + window.ttnote.objectToUrl(params));
        }}
      >
        {project.name}
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
                const params = window.ttnote.searchObject();
                params.mobileShowingArea = 'left';
                delete params.enterFrom;
                window.ttnote.goto('/note' + window.ttnote.objectToUrl(params));
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
          {projects.map(row => renderList(row))}
        </div>
      </MiddleContainer>
    </CSSTransition>
  )
}

export default Middle;