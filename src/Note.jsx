import React, {useEffect} from 'react';
import {getCookie} from './utils/helper';

function Note() {

    useEffect(() => {
      console.log('getCookie: ', getCookie('token'));
        if (!getCookie('token')) {
            window.ttnote.goto('/login?needLogin');
        }
    }, []);

    return (
      <h2>welcome, Jay</h2>
    )
}

export default Note;