import React, { useRef } from "react";
import styled from "styled-components";
import {CSSTransition} from 'react-transition-group';
import Title from "./Title";
import Todo from "./Todo";
import useProject from "../hooks/useProject";
import {TTextArea} from "../common/style";
import RightHeader from "./RightHeader";

const RightContainer = styled.div`
  flex: 4;
  //border-left: 1px solid #fff;
  border-left: 1px solid ${window.ttnoteThemeLight.lineColorLight};
  background-color: ${window.ttnoteThemeLight.bgColorPrimary};
  //align-items: center;
  //justify-content: center;
`;

const RightContent = styled.div`
  height: calc(100vh - 3.3rem);
  overflow: auto;
`;

const ProjectNameRow = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  
  padding: 0.3rem 4vw;
  @media (min-width: 576px) {
    padding: 0.3rem 6vw;
  }
`;

const ProjectDescRow = styled.div`
  padding: 0.3rem 4vw;
  @media (min-width: 576px) {
    padding: 0.3rem 6vw;
  }
`;

const InfoCell = styled.div`
  font-size: 0.6rem;
  color: ${window.ttnoteThemeLight.textColorTips};
  margin-bottom: 0.5rem;
`;

const DescCell = styled.div`
  background-color: #fff;
  padding: 0.3rem;
  border-radius: ${window.ttnoteThemeLight.borderRadiusPrimary};
`;

function Right(props) {
  const {isMobileView, mobileShowingArea} = props;
  const visible = (isMobileView && mobileShowingArea === 'right') || !isMobileView;

  const projectId = window.ttnote.searchObject().projectId;
  const {project, setProject, projectInitial, noProject, postToCreateTomato, updateProject} = useProject(projectId);

  const eventFlag = useRef(true);
  const projectNameInput = useRef(null);
  const projectDescInput = useRef(null);

  const handleProjectNameChange = (e) => {
    const value = e.currentTarget.value;
    setProject({...project, name: value});
  };

  const handleProjectDescOnChange = (e) => {
    const value = e.currentTarget.value;
    setProject({...project, desc: value});
  };

  const handleProjectNameOnBlur = () => {
    if (project.name !== projectInitial.name && eventFlag.current)
      updateProject({name: project.name})
  };

  const handleProjectDescOnBlur = () => {
    if (project.desc !== projectInitial.desc && eventFlag.current)
      updateProject({desc: project.desc})
  };

  const handleProjectNameKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      eventFlag.current = false;
      e.currentTarget.blur();
      const value = e.currentTarget.value;
      if (value) {
        updateProject({name: value});
        projectDescInput.current.focus();
      } else {
        setProject({...project, name: projectInitial.name})
      }
      eventFlag.current = true;
    }
  };

  const handleProjectDescKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      eventFlag.current = false;
      e.currentTarget.blur();
      const value = e.currentTarget.value;
      updateProject({desc: value});
      eventFlag.current = true;
    }
  };

  return (
    <CSSTransition
      component={null}
      in={visible}
      timeout={300}
      exit={false}
      unmountOnExit
      classNames='enter-from-right'
    >
      <RightContainer>
        <RightHeader
          isMobileView={isMobileView}
          postToCreateTomato={postToCreateTomato}
        />
        <RightContent>
          {noProject ? <div>no project</div> :
            <>
              <ProjectNameRow>
                <TTextArea
                  ref={projectNameInput}
                  value={project.name}
                  placeholder={'输入项目标题'}
                  onChange={handleProjectNameChange}
                  onBlur={handleProjectNameOnBlur}
                  onKeyPress={handleProjectNameKeyPress}
                />
              </ProjectNameRow>
              <ProjectDescRow>
                <InfoCell>项目描述</InfoCell>
                <DescCell>
                  <TTextArea
                    ref={projectDescInput}
                    rows={2}
                    onChange={handleProjectDescOnChange}
                    onBlur={handleProjectDescOnBlur}
                    onKeyPress={handleProjectDescKeyPress}
                    value={project.desc}
                    placeholder={'输入项目描述'}
                  />
                </DescCell>
              </ProjectDescRow>
              {project.todos && project.todos.map(todo =>
                <Todo
                  key={todo.id}
                  todo={todo}
                />
              )}
              {project.titles && project.titles.map(title =>
                <Title
                  key={title.id}
                  title={title}
                />
              )}
            </>
          }
        </RightContent>
      </RightContainer>
    </CSSTransition>
  )
}

export default Right;

