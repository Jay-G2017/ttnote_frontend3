import React from "react";
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
  padding-bottom: 3rem;
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
  background-color: ${window.ttnoteThemeLight.bgColorPrimary};
  
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 3rem;
  
  padding: 1rem 4vw;
  @media (min-width: 768px) {
    width: 66.6%;
    padding: 1rem 6vw;
  }
`;

const NewTodoCell = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.disabled ?
  window.ttnoteThemeLight.btnDefaultDisabledFontColor :
  window.ttnoteThemeLight.colorSecondary};
  cursor: pointer;
`;

const NewTitleCell = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.disabled ?
  window.ttnoteThemeLight.btnDefaultDisabledFontColor :
  window.ttnoteThemeLight.colorPrimary};
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

function Right(props) {
  const {isMobileView, mobileShowingArea} = props;
  const visible = (isMobileView && mobileShowingArea === 'right') || !isMobileView;
  const projectId = window.ttnote.searchObject().projectId;

  const {
    project,
    postToCreateTomato,
    handleNewTodo,
    handleNewTitle,
    handleTodoNameChange,
    handleTitleNameChange,
    handleProjectNameChange,
    projectNameInput,
    projectDescInput,
    handleProjectNameEnterPress,
    handleProjectNameOnBlur,
    handleProjectDescOnChange,
    handleProjectDescOnBlur,
    handleTodoNameEnterPress,
    handleTitleNameEnterPress,
    handleTodoNameOnBlur,
    todoExpandedKeys,
    setTodoExpandedKeys,
  } = useProject(projectId);
  const {todoIds, todos, titleIds, titles} = project;

  const newMode = Object.keys(todos).some(id => id < 0) || titleIds.some(id => id < 0);

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
          {!projectId ? <div>no project</div> :
            <>
              <ProjectNameRow>
                <ProjectNameCell>
                  <TTextArea
                    ref={projectNameInput}
                    value={project.name}
                    placeholder={'输入项目标题'}
                    onChange={e => {
                        const value = e.currentTarget.value;
                        handleProjectNameChange(value);
                      }
                    }
                    onBlur={handleProjectNameOnBlur}
                    onKeyPress={e => {
                      if (e.key === 'Enter') {
                       e.preventDefault();
                       handleProjectNameEnterPress(e);
                      }
                    }}
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
                      // onKeyPress={e => {
                      //   if (e.key === 'Enter') {
                      //     e.preventDefault();
                      //     handleProjectDescEnterPress(e)
                      //   }
                      // }}
                      value={project.desc}
                      placeholder={'输入项目描述'}
                    />
                  </DescCell>
                </DescRow>
              </ProjectDescGroup>
              {todoIds && todoIds.length > 0 &&
              <TodoGroupRow>
                <InfoCell>未分组任务</InfoCell>
                {todoIds.map(todoId => (
                  <Todo
                    key={todoId}
                    todo={todos[todoId]}
                    handleTodoNameChange={handleTodoNameChange}
                    handleTodoNameEnterPress={handleTodoNameEnterPress}
                    handleTodoNameOnBlur={handleTodoNameOnBlur}
                    todoExpandedKeys={todoExpandedKeys}
                    setTodoExpandedKeys={setTodoExpandedKeys}
                  />
                ))}
              </TodoGroupRow>
              }
              {titleIds && titleIds.length > 0 &&
              <TitleGroupRow>
                <InfoCell>已分组任务</InfoCell>
                {
                  titleIds.map(titleId =>
                    <Title
                      key={titleId}
                      todos={todos}
                      title={titles[titleId]}
                      handleTitleNameChange={handleTitleNameChange}
                      handleTitleNameEnterPress={handleTitleNameEnterPress}
                      handleTodoNameChange={handleTodoNameChange}
                      handleTodoNameEnterPress={handleTodoNameEnterPress}
                      handleTodoNameOnBlur={handleTodoNameOnBlur}
                      todoExpandedKeys={todoExpandedKeys}
                      setTodoExpandedKeys={setTodoExpandedKeys}
                    />
                  )
                }
              </TitleGroupRow>
              }
            </>
          }
        </RightContent>
        <RightFooter>
          <NewTodoCell
            onClick={() => {
              if (!newMode)
              handleNewTodo();
            }}
            disabled={newMode}
          >
            <IconStyled>
              <IoIosAddCircle/>
            </IconStyled>
            <IconName>新任务</IconName>
          </NewTodoCell>
          <NewTitleCell
            disabled={newMode}
            onClick={() => {
              if (!newMode)
                handleNewTitle();
            }}
          >
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

