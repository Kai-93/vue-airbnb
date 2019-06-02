const Router = require('koa-router');

const router = new Router();
// 路由表
const { routers } = require('./data.js');

/**
 * 判断路由中是否有当前请求的方法
 * @param {String} url 当前请求的url
 * @param {String} method 当前请求的method
 * @param {Object} module 路由表
 * @return {Boolean} has or not
 */
function hasRouter(url, method, module) {
  const $routers = module.routers;
  if ($routers[url] && method.toLowerCase() === $routers[url].method) {
    return true;
  }
  return false;
}

/**
 * 获取当前信息的response
 * @param {Request} request 当前请求
 * @param {Object} module 路由表
 * @return {any} response 请求相应
 */
function getResponse(request, module) {
  debugger;
  const $DEFAULT_URL = JSON.stringify({ _url: '/login/merchant' });
  const $routers = module.routers;
  const $request = request;
  // eslint-disable-next-line no-underscore-dangle
  const url = JSON.parse($request.headers.data || $DEFAULT_URL)._url_;
  let response = 'no response';
  // 若方法存在
  if (hasRouter(url, $request.method, module)) {
    response = $routers[url].response;
  }
  return response;
}

// 遍历每个模块
routers.forEach((module) => {
  const aMethods = ['get', 'post'];
  // 注册每一个method
  aMethods.forEach((method) => {
    router[method](module.url, async (ctx) => {
      const $ctx = ctx;
      $ctx.body = getResponse($ctx.request, module);
    });
  });
});

module.exports = {
  router,
};
