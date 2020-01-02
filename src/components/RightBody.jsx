import React, {useState, useMemo, useCallback, useRef} from "react";
import {PaddingRow, TTextArea} from "../common/style";
import Todo from "./Todo";
import Title from "./Title";
import styled from "styled-components";
import {IoIosAddCircle} from 'react-icons/io'

const RightContent = styled.div`
  //margin-top: 3.3rem;
  //height: calc(100vh - 3.3rem);
  :before {
   content: '';
   height: 3.3rem;
   display: block;
  }
  //:after {
  //  content: '';
  //  height: 3rem;
  //  display: block;
  //}
  height: calc(100% - 3rem);
  overflow: auto;
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
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${window.ttnoteThemeLight.bgColorPrimaryRgba};
  
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 3rem;
  
  padding: 1rem 4vw;
  @media (min-width: 768px) {
    position: absolute;
    //width: calc(60% - 1px);
    padding: 1rem 6vw;
  }
  border-top: 0.5px solid ${window.ttnoteThemeLight.lineColorLight};
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

const RightBody = (props) => {
  const {
    project,
    projectMethods,
    handleProjectChangeFromRight,
    todoExpandedKeys,
    setTodoExpandedKeys,
    todoMethods,
    showMore,
    setShowMore,
    titleMethods,
    handleNewTodo,
    handleNewTitle,

  } = props;
  const {todoIds, todos, titleIds, titles} = project;

  const [projectName, setProjectName] = useState(project.name);
  const [projectDesc, setProjectDesc] = useState(project.desc);

  const projectDescInput = useRef(null);

  const handleProjectNameOnBlur = useCallback((e) => {
    const value = e.currentTarget.value;
    if (value) {
      if (value !== project.name) {
        projectMethods.updateProject({name: value})
      }
    } else {
      // name不能为空
      handleProjectChangeFromRight(project.id, {name: project.name});
      setProjectName(project.name)
    }
  }, [handleProjectChangeFromRight, project.id, project.name, projectMethods]);

  return useMemo(() => (
    <>
      <RightContent>
        <ProjectNameRow>
          <ProjectNameCell>
            <TTextArea
              value={projectName || ''}
              placeholder={'输入项目标题'}
              onChange={e => {
                const value = e.currentTarget.value;
                setProjectName(value);
                handleProjectChangeFromRight(project.id, {name: value});
              }
              }
              onBlur={handleProjectNameOnBlur}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleProjectNameOnBlur(e);
                  projectDescInput.current.focus();
                  projectDescInput.current.selectionStart = project.desc.length;
                  projectDescInput.current.selectionEnd = project.desc.length;
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
                onChange={(e) => {
                  const value = e.currentTarget.value;
                  setProjectDesc(value);
                  handleProjectChangeFromRight(project.id, {desc: value});
                }}
                onBlur={(e) => {
                  const value = e.currentTarget.value;
                  if (value !== project.desc) {
                    projectMethods.updateProject({desc: value})
                  }
                }}
                value={projectDesc || ''}
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
              todoExpandedKeys={todoExpandedKeys}
              setTodoExpandedKeys={setTodoExpandedKeys}
              todoMethods={todoMethods}
              showMore={showMore}
              setShowMore={setShowMore}
              handleNewTodo={handleNewTodo}
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
                todoExpandedKeys={todoExpandedKeys}
                setTodoExpandedKeys={setTodoExpandedKeys}
                todoMethods={todoMethods}
                titleMethods={titleMethods}
                showMore={showMore}
                setShowMore={setShowMore}
                handleNewTodo={handleNewTodo}
              />
            )
          }
        </TitleGroupRow>
        }
      </RightContent>
      <RightFooter>
        <NewTodoCell
          onClick={() => handleNewTodo()}
          disabled={false}
        >
          <IconStyled>
            <IoIosAddCircle/>
          </IconStyled>
          <IconName>新任务</IconName>
        </NewTodoCell>
        <NewTitleCell
          disabled={false}
          onClick={handleNewTitle}
        >
          <IconStyled>
            <IoIosAddCircle/>
          </IconStyled>
          <IconName>新任务组</IconName>
        </NewTitleCell>
      </RightFooter>
    </>
  ), [handleNewTitle, handleNewTodo, handleProjectChangeFromRight, handleProjectNameOnBlur, project.desc, project.id, projectDesc, projectMethods, projectName, setShowMore, setTodoExpandedKeys, showMore, titleIds, titleMethods, titles, todoExpandedKeys, todoIds, todoMethods, todos])
};

export default RightBody;