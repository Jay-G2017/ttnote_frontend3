import React from "react";

export const TomatoContext = React.createContext(null);

export const tomatoInitial = {isPlaying: false, id: null, minutes: 0};

export const tomatoReducer = (state, action) => {
  switch (action.type) {
    case "play":
        return {
          ...state,
          isPlaying: true,
          ...action.payload,
        };
    case "takeRest":
      return {
        ...state,
        id: null,
        isPlaying: true,
        ...action.payload,
      };
    case 'cancel':
      return {
        ...state,
        id: null,
        isPlaying: false,
      };
    default:
      return state
  }
};