import Request from '../request';

// const request = new Request({ module: 'usercenter' });

class UserManager extends Request {
  constructor() {
    super({ module: 'usercenter' });
  }
  // 用户名密码登录
  postLogin(data) {
    this.post('/login/merchant', data);
  }

  // 手机验证码密码登录/检查有没有店铺信息
  postLoginPhoneCheck(data) {
    this.post('/login/merchant_login_check', data);
  }

  // 手机验证码密码登录
  postLoginPhone(data) {
    this.post('/login/merchant_login_by_cellphone', data);
  }

  // 微信扫码登录
  postLoginWecat(data) {
    this.post('/login/merchant_login_by_code', data);
  }
  // 登出
  postLogOut(data = {}) {
    this.post('/login/logout', data);
  }
}

export default new UserManager();
