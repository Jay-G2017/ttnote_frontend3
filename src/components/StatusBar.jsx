import React from 'react';
import styled, { keyframes } from 'styled-components';
import {
  IoIosCheckmarkCircleOutline,
  IoIosSync,
  IoIosAlert,
} from 'react-icons/io';

const StatusRow = styled.div`
  color: ${window.ttnoteThemeLight.textColorDesc};
  font-size: 0.9rem;
`;

const StatusText = styled.span`
  margin-left: 4px;
`;

const spinEffect = keyframes`
  0% {transform: rotate(0deg)}
  100% {transform: rotate(360deg)}
`;

const SyncIcon = styled(IoIosSync)`
  animation: ${spinEffect} 1.2s linear infinite;
`;

const showEffect = keyframes`
  0% {opacity: 0.1}
  100% {opacity: 1}
`;

const CircleIcon = styled(IoIosCheckmarkCircleOutline)`
  animation: ${showEffect} 300ms linear;
`;

const AlertIcon = styled(IoIosAlert)`
  color: ${window.ttnoteThemeLight.colorDanger};
`;

function StatusBar(props) {
  const { type } = props;

  switch (type) {
    case 'saved':
      return (
        <StatusRow>
          <CircleIcon />
          <StatusText>保存成功</StatusText>
        </StatusRow>
      );
    case 'saving':
      return (
        <StatusRow>
          <SyncIcon />
          <StatusText>正在保存...</StatusText>
        </StatusRow>
      );
    case 'failed':
      return (
        <StatusRow>
          <AlertIcon />
          <StatusText>保存失败，请检查网络</StatusText>
        </StatusRow>
      );
    default:
      return <StatusRow>内容将自动保存</StatusRow>;
  }
}

export default StatusBar;
