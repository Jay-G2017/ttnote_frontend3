import {keyframes} from "styled-components";

export const slideIn = keyframes`
  from {
    transform: translate(100%);
  }

  to {
    transform: translate(none);
  }
`;

export const slideLeft = keyframes`
  from {
    transform: translate(-100%);
  }

  to {
    transform: translate(none);
  }
`;
