import styled, { keyframes } from 'styled-components';
import {
  IoIosCheckmarkCircleOutline,
  IoIosSync,
  IoIosAlert,
} from 'react-icons/io';

export const StatusRow = styled.div`
  color: ${window.ttnoteThemeLight.textColorDesc};
  font-size: 0.9rem;
`;

export const StatusText = styled.span`
  margin-left: 4px;
`;

const spinEffect = keyframes`
  0% {transform: rotate(0deg)}
  100% {transform: rotate(360deg)}
`;

export const SyncIcon = styled(IoIosSync)`
  animation: ${spinEffect} 1.2s linear infinite;
`;

const showEffect = keyframes`
  0% {opacity: 0.1}
  100% {opacity: 1}
`;

export const CircleIcon = styled(IoIosCheckmarkCircleOutline)`
  animation: ${showEffect} 300ms linear;
`;

export const AlertIcon = styled(IoIosAlert)`
  color: ${window.ttnoteThemeLight.colorDanger};
`;
