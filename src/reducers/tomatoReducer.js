import React from "react";

export const TomatoContext = React.createContext(null);

export const tomatoInitial = {isPlaying: false, id: null, seconds: 0};

export const tomatoReducer = (state, action) => {
  switch (action.type) {
    case "play":
      if (state.seconds <= 0) {
        window.timeId = clearInterval(window.timeId);
        if (action.afterFinishCallback)
          action.afterFinishCallback(state.id, window.ttnote.tomatoTime);
        if (window.ttnote.continueBreak) {
        return {
          ...state,
          id: null,
          isPlaying: true,
          seconds: window.ttnote.shortBreakTime,
        }
        } else {
          return {
            ...state,
            id: null,
            isPlaying: false,
          }
        }
      } else {
        return {
          ...state,
          seconds: state.seconds - 1,
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