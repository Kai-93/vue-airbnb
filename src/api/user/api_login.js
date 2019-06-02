import Request from '../request';

const request = new Request({ module: 'usercenter' });

// 用户名密码登录
export function postLogin(data) {
  return request.post('/login/merchant', data);
}

// 手机验证码密码登录/检查有没有店铺信息
export function postLoginPhoneCheck(data) {
  return request.post('/login/merchant_login_check', data);
}

// 手机验证码密码登录
export function postLoginPhone(data) {
  return request.post('/login/merchant_login_by_cellphone', data);
}

// 微信扫码登录
export function postLoginWecat(data) {
  return request.post('/login/merchant_login_by_code', data);
}

// 登出
export function postLogOut(data = {}) {
  return request.post('/login/logout', data);
}
