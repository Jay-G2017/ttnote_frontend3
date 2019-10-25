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
  const [mobileShowingArea, setMobileShowingArea] = useState('right');
  const [pcHideMode, setPcHideMode] = useState(false);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleResize = () => {
    setIsMobileView(window.innerWidth < 768);
    if (window.innerWidth < 768) setMobileShowingArea('right');
  };

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
        setMobileShowingArea={setMobileShowingArea}
      />
      <Middle
        isMobileView={isMobileView}
        pcHideMode={pcHideMode}
        setPcHideMode={setPcHideMode}
        mobileShowingArea={mobileShowingArea}
        setMobileShowingArea={setMobileShowingArea}
      />
      <Right
        isMobileView={isMobileView}
        pcHideMode={pcHideMode}
        setPcHideMode={setPcHideMode}
        mobileShowingArea={mobileShowingArea}
        setMobileShowingArea={setMobileShowingArea}
      />
    </NoteContainer>
  )
}

export default Note;