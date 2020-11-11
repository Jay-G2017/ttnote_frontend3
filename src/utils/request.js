import axios from 'axios';
import { getCookie } from './helper';
import { message } from 'antd';

import {
  savingEvent,
  failedEvent,
  dispatchSavedEventLater,
} from '../utils/ChangeStatusEvent';

const Config = { timeout: 30000 };

// 创建axios实例
const service = axios.create({
  baseURL: window.ttnote.baseUrl,
  timeout: Config.timeout, // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    if (config.showSync) {
      window.dispatchEvent(savingEvent);
    }


    if (getCookie('token')) {
      config.headers['Authorization'] = getCookie('token');
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  (response) => {
    const code = response.status;
    if (code < 200 || code > 300) {
      message.error(response.message);
      dispatchEvent(failedEvent('未知错误'));
      return Promise.reject('error');
    } else {
      dispatchSavedEventLater();
      return response.data;
    }
  },
  (error) => {
    let code = 0;
    try {
      code = error.response.status;
    } catch (e) {
      if (error.toString().indexOf('Error: timeout') !== -1) {
        message.error('网络请求超时', 5);
        dispatchEvent(failedEvent('网络请求超时'));
        return Promise.reject(error);
      }
    }
    if (code) {
      if (code === 401) {
        window.ttnote.goto('/login?needLogin');
      } else if (code === 403) {
        window.ttnote.goto('/login?needLogin');
      } else {
        const errorMsg = error.response.message;
        message.error(errorMsg, 5);
      }
    } else {
      dispatchEvent(failedEvent('网络请求失败'));
      message.error('网络请求失败', 5);
    }
    return Promise.reject(error);
  }
);
export default service;
