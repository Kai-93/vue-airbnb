import Axios from 'axios';
import { encrypt, decrypt } from '@/utils/crypto';
import { Message } from 'element-ui';
import router from '@/router';

// Progress 进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getToken } from '@/utils';
import { removeLocal, setLocal } from '@/utils/storage';
import apiModule from './api_module';

const env = process.env;
Axios.defaults.withCredentials = true;
const API = Axios.create();
API.defaults.timeout = 60000;

// 不校验token url数组
const ignoreUrls = [
  '/login/merchant',
  '/login/merchant_login_check',
  '/login/merchant_login_by_cellphone',
  '/login/merchant_login_by_code',
];

// 请求列表
let requestList = [];

// 可重复请求列表
const repeatUrls = [
  '/category/find_category_children',
  '/merchant/uncopy',
  '/admin/product_unimport',
];

// 请求拦截
API.interceptors.request.use(
  (config) => {
    NProgress.start();
    return config;
  },
  error => Promise.reject(error),
);

// 响应拦截
API.interceptors.response.use(
  (res) => {
    NProgress.done();
    return res.data || res;
  },
  (error) => {
    NProgress.done();
    let message = '请求错误！';
    if (error.response) {
      switch (error.response.status) {
        case 400:
          message = '请求参数或语句有误！';
          break;
        case 401:
          message = '未授权，请重新登录！';
          break;
        case 403:
          message = '拒绝访问！';
          break;
        case 404:
          message = '未找到该资源！';
          break;
        case 405:
          message = '请求方法未允许！';
          break;
        case 408:
          message = '请求超时！';
          break;
        case 500:
          message = '服务器端出错！';
          break;
        case 501:
          message = '网络未实现！';
          break;
        case 502:
          message = '网络错误！';
          break;
        case 503:
          message = '服务不可用！';
          break;
        case 504:
          message = '网络超时！';
          break;
        case 505:
          message = 'http版本不支持该请求！';
          break;
        default:
          message = '请求错误！';
      }
    }
    Message.error(
      error.response ? `${error.response.status} : ${message}` : message,
    );
    return Promise.reject(error);
  },
);
export default class Request {
  constructor(options) {
    if (!options.module) {
      throw new Error('module不能为空');
    }
    this.module = options.module;
  }
  post(url = '', data = {}, methods = 'POST', responseType) {
    let $data = data;
    if (requestList.indexOf(url) >= 0 && repeatUrls.indexOf(url) < 0) {
      return new Promise((resolve, reject) => {
        reject({
          errorCode: 0,
          message: '正在请求中！',
        });
      });
    }
    let random = getToken();
    if (ignoreUrls.indexOf(url) >= 0) {
      random = env.random;
    } else if (!random) {
      router.push('/login');
      return new Promise((resolve, reject) => {
        reject({
          errorCode: 0,
          message: '请登录！',
        });
      });
    }
    let token = JSON.stringify({
      _url_: url,
      _random_: random,
    });
    if (env.encryptionHeader) {
      token = encrypt(token, 'header');
    }
    requestList.push(url);
    if (env.encryption) {
      $data = encrypt(JSON.stringify($data));
    }
    const headers = {
      'Content-Type':
        Object.prototype.toString.call($data) === '[object FormData]'
          ? 'multipart/form-data'
          : 'application/json;charset=UTF-8',
      DATA: token,
    };

    const params = {
      url: apiModule[this.module],
      method: methods,
      data: $data,
      headers,
    };
    if (responseType) {
      params.responseType = responseType;
    }
    if (methods === 'GET') {
      params.params = $data;
      delete params.data;
    }

    return new Promise((resolve, reject) => {
      API({ ...params }).then(
        (response) => {
          let $response = response;
          requestList = requestList.filter(ele => ele !== url);
          if (
            $response.code &&
            $response.code !== 0 &&
            $response.code !== 4002602 &&
            $response.code !== 3001 &&
            $response.code !== 3002 &&
            $response.code !== 4001109 &&
            $response.code !== 4002802
          ) {
            Message.error($response.message);
          }
          if (
            ($response.code >= 7001 && $response.code <= 7005) ||
            $response.code === 8
          ) {
            Message.error($response.message);
            if ($response.code >= 7003 && $response.code <= 7005) {
              setLocal('membershipExpired', 'true');
              router.push('/membership');
              return reject({
                errorCode: 0,
                message: $response.message,
              });
            }
            removeLocal('userInfo');
            removeLocal('miaosuan-token');
            removeLocal('userPrice');
            router.push('/login');
            return reject({
              errorCode: 0,
              message: $response.message,
            });
          }
          if (env.encryption) {
            $response = JSON.parse(decrypt($response));
          }
          if (!$response.data || $response.data === null) {
            $response.data = {};
          }
          return resolve($response);
        },
        (err) => {
          requestList = requestList.filter(ele => ele !== url);
          return reject(err);
        },
      );
    });
  }
}
