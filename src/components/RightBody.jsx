import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
  useContext,
} from 'react'
import { PaddingRow, TTextArea } from '../common/style'
import Todo from './Todo'
import Title from './Title'
import styled from 'styled-components'
import { IoIosAddCircle } from 'react-icons/io'
import { ProjectContext } from '../context/projectContext'
import { ProjectsContext } from '../context/ProjectsContext'
import TextareaDebounced from './TextareaDebounced'
import { getFinishedTodoCount } from '../hooks/useProject'
import RichEditor, { serialize } from './richEditor'

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
`

const ProjectNameRow = styled(PaddingRow)`
  margin-top: 0.3rem;
  font-size: 1.2rem;
  font-weight: 700;
`

const ProjectNameCell = styled.div`
  padding: 0 0.3rem;
  margin-left: -0.3rem;
  border-radius: ${window.ttnoteThemeLight.borderRadiusPrimary};
`

const ProjectDescGroup = styled.div``

const InfoCell = styled(PaddingRow)`
  font-size: 0.6rem;
  color: ${window.ttnoteThemeLight.textColorTips};
  margin-bottom: 0.3rem;
`

const DescRow = styled(PaddingRow)`
  margin-bottom: 1.5rem;
`

const DescCell = styled.div`
  background-color: ${(props) => (props.disabled ? 'initial' : '#fff')};
  padding: 0.3rem;
  border-radius: ${window.ttnoteThemeLight.borderRadiusPrimary};
`

const TodoGroupRow = styled.div``

const TitleGroupRow = styled.div`
  margin-top: 1.5rem;
`

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
    position: absolute;
    //width: calc(60% - 1px);
    padding: 1rem 6vw;
  }
  border-top: 0.5px solid ${window.ttnoteThemeLight.lineColorLight};
`

const NewTodoCell = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) =>
    props.disabled
      ? window.ttnoteThemeLight.btnDefaultDisabledFontColor
      : window.ttnoteThemeLight.colorSecondary};
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
`

const NewTitleCell = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) =>
    props.disabled
      ? window.ttnoteThemeLight.btnDefaultDisabledFontColor
      : window.ttnoteThemeLight.colorPrimary};
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
`

const IconStyled = styled.div`
  font-size: 1.6rem;
  display: flex;
`

const IconName = styled.div`
  font-size: 1rem;
  font-weight: 600;
  margin-left: 0.4rem;
  line-height: 1.2;
`

const NoTodoDiv = styled.p`
  margin-top: 6rem;
  text-align: center;
  font-weight: 500;
  color: ${window.ttnoteThemeLight.textColorTips};
`

const TodoBoard = styled.div``

const RightBody = (props) => {
  const { isTaggedProject, showMore, setShowMore } = props

  const {
    project,
    todoExpandedKeys,
    setTodoExpandedKeys,
    todoMethods,
    titleMethods,
    handleNewTodo,
    handleNewTitle,
    updateProject,
  } = useContext(ProjectContext)

  // 文本到json的迁移
  let descJSON = ''
  try {
    if (!+project.desc) {
      // 排除掉纯数字
      descJSON = JSON.parse(project.desc.toString())
    } else {
      descJSON = [{ children: [{ text: project.desc }] }]
    }
  } catch (e) {
    // 如果不是json数据, 进行转化
    descJSON = [{ children: [{ text: project.desc }] }]
  }

  const { handleProjectChangeFromRight } = useContext(ProjectsContext)
  const { todoIds, todos, titleIds, titles } = project

  const [projectName, setProjectName] = useState(project.name)

  const projectDescInput = useRef(null)
  const projectTodoInputRef = useRef(null)
  const stopOnBlurFlag = useRef(false)

  // 新建的project第一次自动focus
  useEffect(() => {
    if (window.focusProjectName) {
      projectTodoInputRef.current.focus()
      projectTodoInputRef.current.selectionStart = projectName.length
      projectTodoInputRef.current.selectionEnd = projectName.length
    }
  })

  const handleProjectNameOnEnterPress = useCallback(
    (e) => {
      const value = e.currentTarget.value
      if (value) {
        if (value !== project.name) {
          updateProject({ name: value })
        }
      } else {
        // name不能为空
        handleProjectChangeFromRight(project.id, { name: project.name })
        setProjectName(project.name)
      }
      stopOnBlurFlag.current = false
    },
    [handleProjectChangeFromRight, project.id, project.name, updateProject]
  )

  const handleProjectNameOnBlur = useCallback(
    (e) => {
      window.focusProjectName = false // 取消自动激活
      if (!stopOnBlurFlag.current) {
        handleProjectNameOnEnterPress(e)
      }
    },
    [handleProjectNameOnEnterPress]
  )

  return useMemo(() => {
    return (
      <>
        <RightContent>
          <ProjectNameRow>
            <ProjectNameCell
              onMouseEnter={(e) => {
                if (!isTaggedProject)
                  e.currentTarget.style.backgroundColor =
                    window.ttnoteThemeLight.bgColorPrimaryDarker
              }}
              onMouseLeave={(e) => {
                if (!isTaggedProject)
                  e.currentTarget.style.backgroundColor = 'inherit'
              }}
            >
              <TTextArea
                ref={projectTodoInputRef}
                value={projectName || ''}
                disabled={isTaggedProject}
                placeholder={'输入项目标题'}
                onChange={(e) => {
                  const value = e.currentTarget.value
                  setProjectName(value)
                  handleProjectChangeFromRight(project.id, { name: value })
                }}
                onBlur={handleProjectNameOnBlur}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    stopOnBlurFlag.current = true
                    e.currentTarget.blur()
                    e.currentTarget.parentNode.style.backgroundColor = 'inherit'
                    handleProjectNameOnEnterPress(e)
                    projectDescInput.current.focus()
                    projectDescInput.current.selectionStart =
                      project.desc.length
                    projectDescInput.current.selectionEnd = project.desc.length
                  }
                }}
              />
            </ProjectNameCell>
          </ProjectNameRow>
          <ProjectDescGroup>
            <InfoCell>项目描述</InfoCell>
            {isTaggedProject ? (
              <DescRow
                style={{
                  color: window.ttnoteThemeLight.textColorTitle,
                  cursor: 'default',
                }}
              >
                {project.desc}
              </DescRow>
            ) : (
              <DescRow>
                <RichEditor
                  defaultValue={descJSON}
                  onChange={(value) => {
                    handleProjectChangeFromRight(project.id, {
                      desc: serialize(value),
                    })
                    updateProject({ desc: JSON.stringify(value) })
                  }}
                />
              </DescRow>
            )}
          </ProjectDescGroup>
          {(!todoIds || todoIds.length === 0) &&
            (!titleIds || titleIds.length === 0) && (
              <NoTodoDiv>无任务</NoTodoDiv>
            )}
          {todoIds && todoIds.length > 0 && (
            <TodoGroupRow>
              <InfoCell>未分组任务</InfoCell>
              {todoIds.map((todoId) => (
                <Todo
                  key={todoId}
                  todo={todos[todoId]}
                  todoExpandedKeys={todoExpandedKeys}
                  setTodoExpandedKeys={setTodoExpandedKeys}
                  todoMethods={todoMethods}
                  handleNewTodo={handleNewTodo}
                  handleProjectChangeFromRight={handleProjectChangeFromRight}
                />
              ))}
            </TodoGroupRow>
          )}
          {titleIds && titleIds.length > 0 && (
            <TitleGroupRow>
              <InfoCell>已分组任务</InfoCell>
              {titleIds.map((titleId) => {
                const title = titles[titleId]
                return (
                  <Title
                    key={titleId}
                    title={title}
                    titleMethods={titleMethods}
                    showMore={showMore}
                    setShowMore={setShowMore}
                    handleNewTodo={handleNewTodo}
                    finishedTodoCount={getFinishedTodoCount(
                      todos,
                      title.todoIds
                    )}
                  >
                    <TodoBoard>
                      {(title.todoIds || []).map((todoId) => (
                        <Todo
                          key={todoId}
                          todo={todos[todoId]}
                          titleId={titleId}
                          todoExpandedKeys={todoExpandedKeys}
                          setTodoExpandedKeys={setTodoExpandedKeys}
                          todoMethods={todoMethods}
                          handleNewTodo={handleNewTodo}
                        />
                      ))}
                    </TodoBoard>
                  </Title>
                )
              })}
            </TitleGroupRow>
          )}
        </RightContent>
        <RightFooter className={'backdrop-blur-right-footer'}>
          <NewTodoCell
            onClick={() => {
              if (!isTaggedProject) handleNewTodo()
            }}
            disabled={isTaggedProject}
          >
            <IconStyled>
              <IoIosAddCircle />
            </IconStyled>
            <IconName>新任务</IconName>
          </NewTodoCell>
          <NewTitleCell
            disabled={isTaggedProject}
            onClick={() => {
              if (!isTaggedProject) handleNewTitle()
            }}
          >
            <IconStyled>
              <IoIosAddCircle />
            </IconStyled>
            <IconName>新任务组</IconName>
          </NewTitleCell>
        </RightFooter>
      </>
    )
  }, [
    descJSON,
    handleNewTitle,
    handleNewTodo,
    handleProjectChangeFromRight,
    handleProjectNameOnBlur,
    handleProjectNameOnEnterPress,
    isTaggedProject,
    project.desc,
    project.id,
    projectName,
    setShowMore,
    setTodoExpandedKeys,
    showMore,
    titleIds,
    titleMethods,
    titles,
    todoExpandedKeys,
    todoIds,
    todoMethods,
    todos,
    updateProject,
  ])
}

export default RightBody
