import React, {useRef} from "react";
import {IoIosMore} from 'react-icons/io';
import Dotdotdot from "react-dotdotdot";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import styled from "styled-components";
import Overlay from "react-bootstrap/Overlay";
import OverlayComp from "./OverlayComp";
dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

const ListRow = styled.div`
  //border-bottom: 0.5px solid ${window.ttnoteThemeLight.lineColorSilver};
  //display: flex;
  //justify-content: center;
  //align-items: center;
  padding: 0 0 0 1.2rem;
  &:hover {
   cursor: pointer;
   color: #fff;
  }
  &:hover .project-desc-row {
   color: ${window.ttnoteThemeLight.textColorLight};
  }
  &:hover .project-info-row {
   color: ${window.ttnoteThemeLight.textColorLight};
  }
  color: ${props => props.active ? '#fff' : window.ttnoteThemeLight.textColorLight };
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

const OverlayContainer = styled.div`
  background-color: ${window.ttnoteThemeLight.bgColorDark};
  border-radius: ${window.ttnoteThemeLight.borderRadiusPrimary};
  color: ${window.ttnoteThemeLight.textColorLight};
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const OverlayItem = styled.div`
  padding: 0.2rem 0.7rem;
  cursor: pointer;
  :hover {
    color: #fff;
  }
`;

const Inner = styled.div`
  padding: 0.6rem 1rem 0.1rem 0 ;
  border-bottom: 0.5px solid ${window.ttnoteThemeLight.lineColorDark};
`;

const ProjectNameRow = styled.div`
  font-weight: 500;
`;

const ProjectDescRow = styled.div`
  padding: 0.5rem 0;
  color: ${props => props.active ? window.ttnoteThemeLight.textColorLight : window.ttnoteThemeLight.textColorDarkDesc };
  font-size: 0.9rem;
`;

const ProjectInfoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${props => props.active ? window.ttnoteThemeLight.textColorLight : window.ttnoteThemeLight.textColorDarkDesc };
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

const MoreCell = styled.div`
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  //color: ${window.ttnoteThemeLight.colorSecondary};
`;

function ProjectList(props) {
  const {
    project,
    activeProjectId,
    isMobileView,
    showOverlayId,
    setShowOverlayId,
    handleProjectDelete,
  } = props;
  const moreButtonRef = useRef(null);
  const fromNow = dayjs(project.updatedAt).fromNow();
  const active = project.id === activeProjectId;
  return (
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
      <Inner className={'middleListInner'}>
        <ProjectNameRow>{project.name}</ProjectNameRow>
        <ProjectDescRow active={active} className={'project-desc-row'}>
          <Dotdotdot
            clamp={2}
          >
            {project.desc || ''}
          </Dotdotdot>
        </ProjectDescRow>
        <ProjectInfoRow active={active} className={'project-info-row'}>
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
          <MoreCell
            ref={moreButtonRef}
            onClick={(e) => {
              e.stopPropagation();
              if (showOverlayId === project.id) {
                setShowOverlayId(null)
              } else {
                setShowOverlayId(project.id)
              }
            }}
          >
            <IoIosMore/>
            <Overlay
              show={showOverlayId === project.id}
              target={moreButtonRef.current}
              placement='left'
              transition={false}
            >
              {props => (
                <OverlayComp {...props}>
                  <OverlayContainer>
                    <OverlayItem
                      onClick={() => {
                        if (window.confirm('这会删除当前项目下的所有信息。\n确定要删除吗？')) {
                          handleProjectDelete(project.id)
                        }
                      }}
                      style={{paddingRight: '0.7rem'}}
                    >删除
                    </OverlayItem>
                  </OverlayContainer>
                </OverlayComp>
              )
              }
            </Overlay>
          </MoreCell>
        </ProjectInfoRow>
      </Inner>
    </ListRow>
  )
}

export default ProjectList;