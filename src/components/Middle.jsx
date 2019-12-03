import React from "react";
import styled from "styled-components";
import {IoIosMenu} from 'react-icons/io';
import {CSSTransition} from "react-transition-group";
import useProjects from "../hooks/useProjects";

const MiddleContainer = styled.div`
  flex: 1;
  border-left: 1px solid ${window.ttnoteThemeLight.lineColorLight};
  //align-items: center;
  //justify-content: center;
  overflow: auto;
  // background-color: ${window.ttnoteThemeLight.bgColorDefault};
  background-color: #fff;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
`;

const ListRow = styled.div`
  border-bottom: 1px solid ${window.ttnoteThemeLight.lineColorLight};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
  &:hover {
   cursor: pointer;
  }
  background: ${props => props.active ? window.ttnoteThemeLight.bgColorPrimary : '' };
  border-radius: ${window.ttnoteThemeLight.borderRadiusPrimary};
`;

function Middle(props) {
  const {isMobileView, mobileShowingArea} = props;
  const iconStyle = {fontSize: '24px', marginBottom: '20px'};
  const visible = (isMobileView && mobileShowingArea === 'middle') || !isMobileView;

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
      timeout={200}
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

        </HeaderRow>
        <div>
          {projects.map(row => renderList(row))}
        </div>
      </MiddleContainer>
    </CSSTransition>
  )
}

export default Middle;