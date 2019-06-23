/*
 * @Author: Kaiser
 * @Date: 2019-06-10 15:28:52
 * @Last Modified by: Kaiser
 * @Last Modified time: 2019-06-23 12:51:04
 */
import axios from '_modules/axios';
import { getType } from '@/utils/tools';
import apiModules from './api_module';
// 默认request的配置
const DEFAULT_OPTION = {
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  timeout: 30000,
  baseURL: process.env.API_DOMAIN,
};

/**
 * 根据网络状态码返回错误信息
 * @param {Number or String} status 网络状态码
 */
function getResponseErrorTip(status) {
  // 错误状态的提示文字
  const RESPONSE_ERROR_TIP = {
    400: '请求参数或语句有误！',
    401: '未授权，请重新登录！',
    403: '拒绝访问！',
    404: '未找到该资源！',
    405: '请求方法未允许！',
    408: '请求超时！',
    500: '服务器端出错！',
    501: '网络未实现！',
    502: '网络错误！',
    503: '服务不可用！',
    504: '网络超时！',
    505: 'http版本不支持该请求！',
  };
  return RESPONSE_ERROR_TIP[status] || '请求错误！';
}

export default class Request {
  /**
   * 构造函数
   * @param {Object} option 自定义request配置
   * option.module必传，其意为请求的模块名
   */
  constructor(option = {}) {
    if (option.module) {
      // 设置模块的url
      this.moduleUrl = apiModules[option.module];
      if (!this.moduleUrl) {
        throw new Error("the request's module is set incorrectly");
      }
    }
    const $option = { ...DEFAULT_OPTION, ...option };
    delete $option.module;
    this.$http = axios.create($option);

    // request拦截器
    this.$http.interceptors.request.use(
      (config) => {
        $vue.$store.dispatch('ui/setNProgress', 'start');
        return config;
      },
      error => Promise.reject(error),
    );

    // response拦截器
    this.$http.interceptors.response.use(
      (response) => {
        $vue.$store.dispatch('ui/setNProgress', 'done');
        return response.data || response;
      },
      (error) => {
        const message = getResponseErrorTip(
          error.response && error.response.status,
        );
        $vue.$store.dispatch('ui/showErrorMessage', message);
        return Promise.reject(error);
      },
    );
  }
  /**
   * 将请求参数封装到headers的DATA中，必要可在这里加密
   * @param {String} url 实际请求的url
   * @param {Object} data 请求参数
   */
  setDATA(url, data = {}) {
    let str = '';
    if (getType(data) === 'Object') {
      Object.entries(data).forEach((query) => {
        str += `${query[0]}=${query[1]}`;
      });
    }
    this.$http.defaults.headers.DATA = JSON.stringify({
      _url_: url + (str && `?${str}`),
      // todo 这是干啥的？
      _random_: '880000003',
    });
  }

  get(url, data) {
    return new Promise((resolve) => {
      this.setDATA(url, data);
      resolve(
        this.$http({
          method: 'get',
          url: this.moduleUrl,
        }),
      );
    });
  }

  post(url, data) {
    return new Promise((resolve) => {
      this.setDATA(url);
      resolve(
        this.$http({
          method: 'post',
          url: this.moduleUrl,
          data,
        }),
      );
    });
  }

  delete(url, data) {
    return new Promise((resolve) => {
      this.setDATA(url);
      resolve(
        this.$http({
          method: 'delete',
          url: this.moduleUrl,
          data,
        }),
      );
    });
  }

  put(url, data) {
    return new Promise((resolve) => {
      this.setDATA(url);
      resolve(
        this.$http({
          method: 'put',
          url: this.moduleUrl,
          data,
        }),
      );
    });
  }
}
