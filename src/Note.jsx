import React, {useEffect, useState} from 'react';
import {getCookie, setCookie} from './utils/helper';
import {Button} from "react-bootstrap";

function Note() {

  const [login, setLogin] = useState(false);

  // 前端判断登录失效
  useEffect(() => {
    if (!getCookie('token')) {
      window.ttnote.goto('/login?needLogin');
    }
  }, []);

  useEffect(() => {
    const url = window.ttnote.baseUrl + '/try_authenticate';
    window.ttnote.fetch(url).then(res => {
      setLogin(res.login)
    })
  }, []);

  const handleLogout = () => {
    const url = window.ttnote.baseUrl + '/users/logout';
    window.ttnote.fetch(url, {
      method: 'delete',
    }).then(() => {
      setCookie('token', '', '-10');
      localStorage.removeItem('ttnoteUser');
      window.ttnote.user = null;
      window.ttnote.goto('/login');
    })
  };

  return (
    <>
    <h2>{`welcome, ${window.ttnote.user.email.split('@')[0]}`}</h2>
    <p>{`login: ${login}`}</p>
      <Button onClick={handleLogout}>log out</Button>
    </>
  )
}

export default Note;