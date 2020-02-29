import React, {useEffect, useReducer, useState} from 'react';
import styled from 'styled-components';
import Left from "./components/Left";
import Middle from "./components/Middle";
import Right from "./components/Right";
import {TomatoContext, tomatoReducer, tomatoInitial} from './reducers/tomatoReducer';
import {getCookie} from "./utils/helper";
import useProjects from "./hooks/useProjects";
import {CATEGORY_TYPE_INBOX, CATEGORY_TYPE_TAGGED} from "./common/constants";
import {ProjectsContext} from "./context/ProjectsContext";

const NoteContainer = styled.div`
  display: flex;
  height: 100vh;
  //background-color: #ededed;
`;

function Note() {
  const isMobile = window.innerWidth < 768;
  const [isMobileView, setIsMobileView] = useState(isMobile);

  const mobileShowingArea = window.ttnote.searchObject().mobileShowingArea || 'right';

  const [tomatoState, tomatoDispatch] = useReducer(tomatoReducer, tomatoInitial);

  const searchObject = window.ttnote.searchObject();
  const categoryId = searchObject.categoryId || CATEGORY_TYPE_INBOX;
  const {
    projects,
    projectCreating,
    handleNewProject,
    handleProjectDelete,
    handleProjectChangeFromRight,
    syncProject,
  } = useProjects(categoryId);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && !isMobileView) {
        const params = window.ttnote.searchObject();
        params.mobileShowingArea = 'right';
        window.ttnote.goto('/note' + window.ttnote.objectToUrl(params));
      }
      if (window.innerWidth >= 768 && isMobileView) {
        const params = window.ttnote.searchObject();
        delete params.mobileShowingArea;
        delete params.enterFrom;
        window.ttnote.goto('/note' + window.ttnote.objectToUrl(params));
      }
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileView]);

  // 设置body的background-color
  useEffect(() => {
    document.body.style.backgroundColor = window.ttnoteThemeLight.bgColorGrey;

    return () => document.body.style.backgroundColor = '#fff';
  }, []);

  // const handleLogout = () => {
  //   const url = window.ttnote.baseUrl + '/users/logout';
  //   window.ttnote.fetch(url, {
  //     method: 'delete',
  //   }).then(() => {
  //     setCookie('token', '', '-10');
  //     localStorage.removeItem('ttnoteUser');
  //     window.ttnote.user = null;
  //     window.ttnote.goto('/login');
  //   })
  // };
  console.log('note in');
  // need login without token
  const needLogin = !getCookie('token');
  if (needLogin) {
    window.ttnote.goto('/login?needLogin');
    return <></>;
  }

  return (
    <NoteContainer>
      <Left
        categoryId={categoryId}
        isMobileView={isMobileView}
        mobileShowingArea={mobileShowingArea}
      />
      <Middle
        isMobileView={isMobileView}
        mobileShowingArea={mobileShowingArea}
        projects={projects}
        isTaggedCategory={categoryId === CATEGORY_TYPE_TAGGED}
        projectCreating={projectCreating}
        handleNewProject={handleNewProject}
        handleProjectDelete={handleProjectDelete}
      />
      <TomatoContext.Provider value={{tomatoState, tomatoDispatch}}>
        <ProjectsContext.Provider value={{syncProject, handleProjectChangeFromRight}}>
          <Right
            isMobileView={isMobileView}
            isTaggedProject={categoryId === CATEGORY_TYPE_TAGGED}
            mobileShowingArea={mobileShowingArea}
          />
        </ProjectsContext.Provider>
      </TomatoContext.Provider>
    </NoteContainer>
  )
}

export default Note;