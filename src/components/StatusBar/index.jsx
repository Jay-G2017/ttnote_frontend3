import React, { useEffect, useState } from 'react';
import {
  StatusRow,
  CircleIcon,
  StatusText,
  SyncIcon,
  AlertIcon,
} from './styles';

function StatusBar(props) {
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  // 注册一个listener, 来全局改变状态
  useEffect(() => {
    const handleStatusChange = (e) => {
      setStatus(e.detail.status);
      if (e.detail.message) setMessage(e.detail.message);
    };

    window.addEventListener('changeStatus', handleStatusChange, false);
    return (() => {
      window.removeEventListener('changeStatus', handleStatusChange)
    })
  }, []);

  switch (status) {
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
          <StatusText>{`保存失败，${message || '请检查网络'}`}</StatusText>
        </StatusRow>
      );
    default:
      return <StatusRow>内容将自动保存</StatusRow>;
  }
}

export default StatusBar;
