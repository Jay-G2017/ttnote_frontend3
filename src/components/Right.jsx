import React, {useRef} from "react";
import styled from "styled-components";
import {CSSTransition} from 'react-transition-group';
import Title from "./Title";
import Todo from "./Todo";
import useProject from "../hooks/useProject";
import {TTextArea, PaddingRow} from "../common/style";
import RightHeader from "./RightHeader";
import {IoIosAddCircle} from 'react-icons/io'

const RightContainer = styled.div`
  flex: 4;
  //border-left: 1px solid #fff;
  border-left: 1px solid ${window.ttnoteThemeLight.lineColorLight};
  background-color: ${window.ttnoteThemeLight.bgColorPrimary};
  //align-items: center;
  //justify-content: center;
  height: 100%;
  position: relative;
  overflow: auto;
`;

const RightContent = styled.div`
  margin-top: 3.3rem;
  //height: calc(100vh - 3.3rem);
`;

const ProjectNameRow = styled(PaddingRow)`
  font-size: 1.2rem;
  font-weight: 700;
`;

const ProjectNameCell = styled.div`
 padding: 0.3rem 0;
`;

const ProjectDescGroup = styled.div`
  
`;

const InfoCell = styled(PaddingRow)`
  font-size: 0.6rem;
  color: ${window.ttnoteThemeLight.textColorTips};
  margin-bottom: 0.3rem;
`;

const DescRow = styled(PaddingRow)`
 
`;

const DescCell = styled.div`
  background-color: #fff;
  padding: 0.3rem;
  border-radius: ${window.ttnoteThemeLight.borderRadiusPrimary};
`;

const TodoGroupRow = styled.div`
  margin-top: 1.5rem;
`;

const TitleGroupRow = styled.div`
  margin-top: 1.5rem;
`;

const RightFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  
  padding: 1rem 4vw;
  @media (min-width: 768px) {
    width: 66.67%;
    padding: 1rem 6vw;
  }
`;

const NewTodoCell = styled.div`
  display: flex;
  align-items: center;
  color: ${window.ttnoteThemeLight.colorSecondary};
`;

const NewTitleCell = styled.div`
  display: flex;
  align-items: center;
  color: ${window.ttnoteThemeLight.colorPrimary};
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
                <ProjectNameCell>
                <TTextArea
                  ref={projectNameInput}
                  value={project.name}
                  placeholder={'输入项目标题'}
                  onChange={handleProjectNameChange}
                  onBlur={handleProjectNameOnBlur}
                  onKeyPress={handleProjectNameKeyPress}
                />
                </ProjectNameCell>
              </ProjectNameRow>
              <ProjectDescGroup>
                <InfoCell>项目描述</InfoCell>
                <DescRow>
                  <DescCell>
                    <TTextArea
                      style={{minHeight: '3rem'}}
                      ref={projectDescInput}
                      onChange={handleProjectDescOnChange}
                      onBlur={handleProjectDescOnBlur}
                      onKeyPress={handleProjectDescKeyPress}
                      value={project.desc}
                      placeholder={'输入项目描述'}
                    />
                  </DescCell>
                </DescRow>
              </ProjectDescGroup>
              {project.todos && project.todos.length > 0 &&
              <TodoGroupRow>
                <InfoCell>未分组任务</InfoCell>
                {project.todos.map(todo => (
                  <Todo
                    key={todo.id}
                    todo={todo}
                  />
                ))}
              </TodoGroupRow>
              }
              {project.titles && project.titles.length > 0 &&
              <TitleGroupRow>
                <InfoCell>已分组任务</InfoCell>
                {
                  project.titles.map(title =>
                    <Title
                      key={title.id}
                      title={title}
                    />
                  )
                }
              </TitleGroupRow>
              }
            </>
          }
        </RightContent>
        <RightFooter>
          <NewTodoCell>
            <IconStyled>
              <IoIosAddCircle/>
            </IconStyled>
            <IconName>新任务</IconName>
          </NewTodoCell>
          <NewTitleCell>
            <IconStyled>
              <IoIosAddCircle/>
            </IconStyled>
            <IconName>新任务组</IconName>
          </NewTitleCell>
        </RightFooter>
      </RightContainer>
    </CSSTransition>
  )
}

export default Right;

