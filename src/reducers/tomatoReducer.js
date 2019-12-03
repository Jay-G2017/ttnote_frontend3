import React from "react";

export const TomatoContext = React.createContext(null);

export const tomatoInitial = {isPlaying: false, id: null, seconds: 0, progress: 1};

export const tomatoReducer = (state, action) => {
  const tomatoTime = window.ttnote.tomatoTime;
  switch (action.type) {
    case "play":
      if (state.seconds <= 0) {
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
        return {
          ...state,
          seconds: remain,
          progress: progress || 1,
        };
      }
    case "break":
      if (state.seconds <= 0) {
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