import React, {useCallback, useMemo, useState} from "react";
import styled from "styled-components";
import useProject from "../hooks/useProject";
import RightHeader from "./RightHeader";
import RightBody from "./RightBody";
import {FlexRow} from "../common/style";

const RightContainer = styled.div`
  flex: 3.5;
  //border-left: 1px solid #fff;
  //border-left: 0.5px solid ${window.ttnoteThemeLight.lineColorSilver};
  //background-color: ${window.ttnoteThemeLight.bgColorDefault};
  background-color: ${window.ttnoteThemeLight.bgColorActive};
  //align-items: center;
  //justify-content: center;
  height: 100%;
  position: relative;
  display: ${props => props.visible ? 'block' : 'none'};
`;

const NoProjectDiv = styled.p`
  text-align: center;
  height: calc(100vh - 3.3rem);
  line-height: calc(100vh - 3.3rem);
  font-weight: 500;
  color: ${window.ttnoteThemeLight.textColorTips};
`;


function Right(props) {
  const {
    isMobileView,
    mobileShowingArea,
    handleProjectChangeFromRight,
  } = props;
  const visible = (isMobileView && mobileShowingArea === 'right') || !isMobileView;
  const projectId = window.ttnote.searchObject().projectId;
  const [showMore, setShowMore] = useState({type: null, id: null});

  const {
    project,
    isLoading,
    handleNewTodo,
    handleNewTitle,
    todoExpandedKeys,
    setTodoExpandedKeys,
    todayTomatoSize,
    projectMethods,
    todoMethods,
    titleMethods,
  } = useProject(projectId);

  // const newMode = Object.keys(todos).some(id => id < 0) || titleIds.some(id => id < 0);

  const renderRightBody = useCallback(() => {
    if (projectId) {
      if (isLoading) {
        return(
        <NoProjectDiv>Loading</NoProjectDiv>
        )
      } else {
        return (
          <RightBody
            project={project}
            projectMethods={projectMethods}
            handleProjectChangeFromRight={handleProjectChangeFromRight}
            todoExpandedKeys={todoExpandedKeys}
            setTodoExpandedKeys={setTodoExpandedKeys}
            todoMethods={todoMethods}
            showMore={showMore}
            setShowMore={setShowMore}
            titleMethods={titleMethods}
            handleNewTodo={handleNewTodo}
            handleNewTitle={handleNewTitle}
          />
        )
      }
    } else {
      return (
        <NoProjectDiv>无项目</NoProjectDiv>
      )
    }
  }, [handleNewTitle, handleNewTodo, handleProjectChangeFromRight, isLoading, project, projectId, projectMethods, setTodoExpandedKeys, showMore, titleMethods, todoExpandedKeys, todoMethods]);

  return (
    useMemo(() => (
      <RightContainer
        visible={visible}
        onClick={() => {
          if (showMore.id)
            setShowMore({id: null, type: null})
        }}>
        <RightHeader
          isMobileView={isMobileView}
          createTomato={todoMethods.createTomato}
          todayTomatoSize={todayTomatoSize}
        />
        {renderRightBody()}
      </RightContainer>
    ), [isMobileView, renderRightBody, showMore.id, todayTomatoSize, todoMethods.createTomato, visible])
  )
}

export default Right;

