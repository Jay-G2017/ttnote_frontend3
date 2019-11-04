import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Left from "./components/Left";
import Middle from "./components/Middle";
import Right from "./components/Right";

const NoteContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #ededed;
`;

function Note() {
  const isMobile = window.innerWidth < 768;
  const [isMobileView, setIsMobileView] = useState(isMobile);

  const [pcHideMode, setPcHideMode] = useState(false);

  const mobileShowingArea = window.ttnote.searchObject().mobileShowingArea || 'right';

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && !isMobileView) {
        window.ttnote.goto('/note?mobileShowingArea=right')
      }
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileView]);

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

  return (
    <NoteContainer>
      <Left
        isMobileView={isMobileView}
        pcHideMode={pcHideMode}
        mobileShowingArea={mobileShowingArea}
      />
      <Middle
        isMobileView={isMobileView}
        pcHideMode={pcHideMode}
        setPcHideMode={setPcHideMode}
        mobileShowingArea={mobileShowingArea}
      />
      <Right
        isMobileView={isMobileView}
        pcHideMode={pcHideMode}
        setPcHideMode={setPcHideMode}
        mobileShowingArea={mobileShowingArea}
      />
    </NoteContainer>
  )
}

export default Note;