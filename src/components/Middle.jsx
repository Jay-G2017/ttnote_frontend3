import React, {useMemo, useState} from "react";
import styled from "styled-components";
import {IoIosMenu, IoIosAddCircle} from 'react-icons/io';
import ProjectList from "./ProjectList";

const MiddleContainer = styled.div`
  flex: 1.5;
  border-left: 0.5px solid ${window.ttnoteThemeLight.lineColorDark};
  //align-items: center;
  //justify-content: center;
  background-color: ${window.ttnoteThemeLight.bgColorGrey};
  //color: #fff;
  //background-color: #fff;
  height: 100%;
  position: relative;
  display: ${props => props.visible ? 'block' : 'none'};
`;

const HeaderRow = styled.div`
  padding: 0 6vw;
  display: flex;
  align-items: center;
  height: 3.3rem;
  border-bottom: 0.5px solid ${window.ttnoteThemeLight.lineColorDark};
  
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  //background-color: ${window.ttnoteThemeLight.bgColorGreyRgba};
  //backdrop-filter: blur(10px);
  @media (min-width: 768px) {
    position: absolute;
  }
  z-index: 10;
`;

const MiddleBody = styled.div`
  :before {
    content: '';
    display: block;
    height: 3.3rem;
  }
  :after {
    content: '';
    display: block;
    height: 3rem;
  }
  height: 100%;
  overflow: auto;
  & .middleList:last-child .middleListInner {
    border-bottom: none;
  }
`;

const MiddleFooter = styled.div`
 display: flex;
  align-items: center;
  justify-content: center;
  //background-color: ${window.ttnoteThemeLight.bgColorGreyRgba};
  //backdrop-filter: blur(10px);
  
  position: fixed;
  bottom: 0;
  z-index: 10;
  left: 0;
  width: 100%;
  height: 3rem;
  
  padding: 1rem 4vw;
  @media (min-width: 768px) {
    position: absolute;
    //left: calc(20% + 0.5px);
    //width: calc(20% - 0px);
    padding: 1rem 1vw;
  }
  border-top: 0.5px solid ${window.ttnoteThemeLight.lineColorDark};
  //border-right: 0.5px solid ${window.ttnoteThemeLight.lineColorSilver};
`;


const NewProjectCell = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.disabled ?
  window.ttnoteThemeLight.bgColorGreyDisabled :
  window.ttnoteThemeLight.textColorLight};
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
`;

const IconStyled = styled.div`
  font-size: 1.6rem;
  display: flex;
`;

const IconName = styled.div`
  font-size: 1rem;
  font-weight: 600;
  margin-left: 0.4rem;
  line-height: 1.2;
`;

function Middle(props) {
  const {
    isMobileView,
    mobileShowingArea,
    projects,
    isTaggedCategory,
    projectCreating,
    handleNewProject,
    handleProjectDelete,
  } = props;
  const [showOverlayId, setShowOverlayId] = useState(null);

  const iconStyle = {fontSize: '24px', color: window.ttnoteThemeLight.textColorLight};
  const visible = (isMobileView && mobileShowingArea === 'middle') || !isMobileView;

  const searchObject = window.ttnote.searchObject();
  // const enterFrom = searchObject.enterFrom || 'left';
  const activeProjectId = searchObject.projectId;

  return (
    useMemo(() => (
      <MiddleContainer
        visible={visible}
        onClick={() => {
          if (showOverlayId)
            setShowOverlayId(null);
        }}
      >
        <HeaderRow className={'backdrop-blur-middle'}>
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
        <MiddleBody>
          {projects.map(project => <ProjectList
            key={project.id}
            project={project}
            active={project.id.toString() === activeProjectId}
            moreActionShown={!isTaggedCategory}
            isMobileView={isMobileView}
            showOverlayId={showOverlayId}
            setShowOverlayId={setShowOverlayId}
            handleProjectDelete={handleProjectDelete}
          /> )}
        </MiddleBody>
        <MiddleFooter className={'backdrop-blur-middle'}>
          <NewProjectCell
            disabled={isTaggedCategory}
            onClick={() => {
              if (!projectCreating)
                handleNewProject()
            }}
          >
            <IconStyled>
              <IoIosAddCircle/>
            </IconStyled>
            <IconName>新项目</IconName>
          </NewProjectCell>
        </MiddleFooter>
      </MiddleContainer>
    ), [activeProjectId, handleNewProject, handleProjectDelete, iconStyle, isMobileView, isTaggedCategory, projectCreating, projects, showOverlayId, visible])
  )
}

export default Middle;