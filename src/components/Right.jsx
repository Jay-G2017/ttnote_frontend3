import React, { useState } from 'react'
import styled from 'styled-components'
import useProject from '../hooks/useProject'
import RightHeader from './RightHeader'
import RightBody from './RightBody'
import { ProjectContext } from '../context/projectContext'
import LoadingComp from './LoadingComp'

const RightContainer = styled.div`
  /* flex: auto; */
  /* width: 58.33% */
  width: ${(props) => (props.isMobileView ? '100%' : '58.33%')};
  //border-left: 1px solid #fff;
  //border-left: 0.5px solid ${window.ttnoteThemeLight.lineColorSilver};
  background-color: ${window.ttnoteThemeLight.bgColorPrimary};
  //align-items: center;
  //justify-content: center;
  height: 100%;
  position: relative;
  display: ${(props) => (props.visible ? 'block' : 'none')};
`

const NoProjectDiv = styled.p`
  text-align: center;
  height: calc(100vh - 3.3rem);
  line-height: calc(100vh - 3.3rem);
  font-weight: 500;
  color: ${window.ttnoteThemeLight.textColorTips};
`

function Right(props) {
  const {
    isMobileView,
    mobileShowingArea,
    isTaggedProject, // 这种特殊的项目name, desc都是不能编辑的。
  } = props
  const visible =
    (isMobileView && mobileShowingArea === 'right') || !isMobileView
  const projectId = window.ttnote.searchObject().projectId
  const [showMore, setShowMore] = useState({ type: null, id: null })

  const projectContextValue = useProject(projectId)
  const { isLoading } = projectContextValue

  return (
    <ProjectContext.Provider value={projectContextValue}>
      <RightContainer
        visible={visible}
        isMobileView={isMobileView}
        onClick={() => {
          if (showMore.id) setShowMore({ id: null, type: null })
        }}
      >
        <RightHeader isMobileView={isMobileView} />
        {projectId ? (
          <LoadingComp isLoading={isLoading}>
            <RightBody
              isTaggedProject={isTaggedProject}
              showMore={showMore}
              setShowMore={setShowMore}
            />
          </LoadingComp>
        ) : (
          <NoProjectDiv>无项目</NoProjectDiv>
        )}
      </RightContainer>
    </ProjectContext.Provider>
  )
}

export default Right
