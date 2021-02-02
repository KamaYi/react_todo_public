import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { message, Modal } from 'antd';
import BaseConfig from '../config';
import { getToken } from '../utils/cookie';
import store from '../store/index';
import { logout } from '../store/module/user';
import { updateSettings,SETTINGS_KEY,Settings } from '@/store/module/settings';
// import { clearSideBarRoutes } from '../store/module/app';
import LocalStore from '@/utils/store';

interface ResponseData<T> {
  code: number;

  data: T;

  msg: string;
}

// 指定 axios 请求类型

axios.defaults.headers = {
  'Content-Type': 'application/json;charset=utf-8',
};

// 指定请求地址
const localStorage = LocalStore.getValue(SETTINGS_KEY) as Settings
console.log('localStorage: ', localStorage);

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? BaseConfig.API_URL : '';

// 添加请求拦截器
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken();
    localStorage.loadingStatus = true
    store.dispatch(updateSettings(localStorage));
    // 获取用户token，用于校验
    /* eslint-disable  no-param-reassign */
    if (token) {
      config.headers.token = token;
    }

    // console.log('config: ', config);
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// 添加响应拦截器，拦截登录过期或者没有权限

axios.interceptors.response.use(
  (res: AxiosResponse<ResponseData<any>>) => {
    localStorage.loadingStatus = false
    store.dispatch(updateSettings(localStorage));
    console.log('res: ', res);
    // 请求成功 此处进行数据的批量处理
    if (res.status === 200) {
      // @ts-ignore
      res.data.msg && message.info(res.data.msg)
      return res.data as any;
    }
  },
  (error: AxiosError) => {
    localStorage.loadingStatus = false
    store.dispatch(updateSettings(localStorage));
    console.log('error: ', error.response)
    // @ts-ignore
    const { status } = error.response;
    let msg = error.response?.data;
    
    console.log('status: ', status);
    switch (status) {
      case 400:
        msg = '错误请求'
        break
      case 401:
        msg = '登录失效，请重新登录'
        store.dispatch(logout());
        break
      case 403:
        msg = '无权访问'
        break
      case 404:
        msg = '请求错误,未找到该资源'
        break
      case 405:
        msg = '请求方法未允许'
        break
      case 504:
        msg = '请求超时'
        break
      case 422:
        msg = '请求格式不正确'
        break
      case 500:
        msg = '服务器端出错'
        break
    }
    message.error(msg);
    return Promise.reject(error);
  },
);

// 统一发起请求的函数
export function request<T>(options: AxiosRequestConfig) {
  return axios.request<T>(options);
}
