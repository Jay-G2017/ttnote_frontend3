import React from "react";
import DingSound from '../audio/DingSound.mp3';
import DingDingSound from '../audio/DingDingSound.mp3';
import BreakSound from '../audio/BreakSound.mp3'
import {Howl} from 'howler';

export const TomatoContext = React.createContext(null);

export const tomatoInitial = {isPlaying: false, id: null, seconds: 0, progress: 1};

export const tomatoReducer = (state, action) => {
  const tomatoTime = window.ttnote.tomatoTime;
  switch (action.type) {
    case "play":
      if (state.seconds <= 0) {
        new Howl({src: DingSound}).play();
        window.ttnote.midAlert = false;
        window.timeId = clearInterval(window.timeId);
        if (action.afterFinishCallback)
          action.afterFinishCallback(state.id, tomatoTime);
        if (window.ttnote.continueBreak) {
        return {
          ...state,
          id: null,
          isPlaying: true,
          seconds: window.ttnote.shortBreakTime * 60,
        }
        } else {
          return {
            ...state,
            id: null,
            isPlaying: false,
          }
        }
      } else {
        const total = tomatoTime * 60;
        const remain = state.seconds - 1;
        const going = total - remain;
        const progress = Math.round(going/total*100);
        if (progress > 50 && !window.ttnote.midAlert) {
          new Howl({src: DingDingSound}).play();
          window.ttnote.midAlert = true
        }
        return {
          ...state,
          seconds: remain,
          progress: progress || 1,
        };
      }
    case "break":
      if (state.seconds <= 0) {
        new Howl({src: BreakSound}).play();
        window.timeId = clearInterval(window.timeId);
        return {
          ...state,
          id: null,
          isPlaying: false,
        }
      } else {
        return {
          ...state,
          seconds: state.seconds - 1,
        };
      }
    case 'cancel':
      window.timeId = clearInterval(window.timeId);
      return {
        ...state,
        id: null,
        isPlaying: false,
      };
    case 'init':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state
  }
};