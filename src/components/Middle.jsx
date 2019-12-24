import React from "react";
import styled from "styled-components";
import {IoIosMenu, IoIosAddCircle, IoIosMore} from 'react-icons/io';
import {CSSTransition} from "react-transition-group";
import useProjects from "../hooks/useProjects";
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
import LinesEllipsis from 'react-lines-ellipsis';
dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

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
  background-color: ${window.ttnoteThemeLight.bgColorGreyRgba};
  backdrop-filter: blur(10px);
  @media (min-width: 768px) {
    position: absolute;
  }
`;

const ListRow = styled.div`
  //border-bottom: 0.5px solid ${window.ttnoteThemeLight.lineColorSilver};
  color: ${window.ttnoteThemeLight.textColorLight};
  //display: flex;
  //justify-content: center;
  //align-items: center;
  padding: 0 0 0 1.2rem;
  &:hover {
   cursor: pointer;
  }
  // background: ${props => props.active ? window.ttnoteThemeLight.bgColorGreyActive : '' };
  //border-radius: ${window.ttnoteThemeLight.borderRadiusPrimary};
  position: relative;
  :before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 0.3rem;
    background-color: ${props => props.active ? window.ttnoteThemeLight.bgColorGreyActive2: ''};
  }
  
`;

const Inner = styled.div`
  padding: 0.6rem 1rem 0.1rem 0 ;
  border-bottom: 0.5px solid ${window.ttnoteThemeLight.lineColorDark};
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
  background-color: ${window.ttnoteThemeLight.bgColorGreyRgba};
  backdrop-filter: blur(10px);
  
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
  window.ttnoteThemeLight.btnDefaultDisabledFontColor :
  window.ttnoteThemeLight.textColorLight};
  cursor: pointer;
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

const PlaceholderDiv = styled.div`
  height: 3.3rem;
`;

// const Right = styled.div`
//
// `;

const ProjectNameRow = styled.div`
  font-weight: 500;
`;

const ProjectDescRow = styled.div`
  padding: 0.5rem 0;
  color: ${window.ttnoteThemeLight.textColorDarkDesc};
  font-size: 0.9rem;
`;

const ProjectInfoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${window.ttnoteThemeLight.textColorDarkDesc};
  font-size: 0.9rem;
`;

const TimeCell = styled.div`
  width: 5rem;
`;

const TomatoCountCell = styled.div`
  width: 3rem;
  display: flex;
  align-items: center;
`;

const MoreCell = styled(IoIosMore)`
  font-size: 1.4rem;
  color: ${window.ttnoteThemeLight.primaryFont};
  
  flex: none;
`;

function Middle(props) {
  const {isMobileView, mobileShowingArea} = props;
  const iconStyle = {fontSize: '24px'};
  const visible = (isMobileView && mobileShowingArea === 'middle') || !isMobileView;

  const searchObject = window.ttnote.searchObject();
  const enterFrom = searchObject.enterFrom || 'left';
  const categoryId = parseInt(searchObject.categoryId) || -1;
  const projectId = parseInt(searchObject.projectId);
  const {projects} = useProjects(categoryId);

  const renderList = (project) => {
    const fromNow = dayjs(project.updatedAt).fromNow();
    const active = project.id === projectId;
    return(
      <ListRow
        className={'middleList'}
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
        {/*<Left>{fromNow}</Left>*/}
        {/*<Right>*/}
        {/*</Right>*/}
        <Inner className={'middleListInner'}>
          <ProjectNameRow>{project.name}</ProjectNameRow>
          <ProjectDescRow>
            <LinesEllipsis
              text={project.desc || ''}
              maxLine={2}
            />
          </ProjectDescRow>
          <ProjectInfoRow>
            <TimeCell>{fromNow}</TimeCell>
            <TomatoCountCell>
              <span
                role='img'
                aria-label={'tomato'}
                style={{marginRight: '0.2rem', color: 'transparent', textShadow: `0 0 ${window.ttnoteThemeLight.colorSecondary}`}}
              >🍅</span>
              <span>
              </span>
              <span>{project.tomatoesCount}</span>
            </TomatoCountCell>
            <MoreCell/>
          </ProjectInfoRow>
        </Inner>
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
        <MiddleBody>
          {isMobileView &&
            <PlaceholderDiv />
          }
          {projects.map(row => renderList(row))}
        </MiddleBody>
        <MiddleFooter>
          <NewProjectCell
            // onClick={() => handleNewTodo()}
          >
            <IconStyled>
              <IoIosAddCircle/>
            </IconStyled>
            <IconName>新项目</IconName>
          </NewProjectCell>
        </MiddleFooter>
      </MiddleContainer>
    </CSSTransition>
  )
}

export default Middle;