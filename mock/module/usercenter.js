const Mock = require('mockjs');

const Random = Mock.Random;

const { usercenter } = require('../../src/api/api_module');

const routers = {
  // 用户名密码登录登录接口
  '/login/merchant': {
    method: 'post',
    DATA: { _url_: '/login/merchant', _random_: '880000003' },
    // https://github.com/nuysoft/Mock/wiki/Mock.mock()
    response: Mock.mock({
      'id|+1': 1,
      'serial_number|1-100': 1,
      'warn_number|1-100': 1,
      'warn_name|1': ['报警类型1', '报警类型2', '报警类型3'],
      'warn_level|1': ['紧急', '重要'],
      warn_detail: '环境IP:10.114.123.12,服务名称:XX',
      create_time: Random.datetime(),
      finish_time: Random.datetime(),
      'contact|4': 'abc',
    }),
  },
  // todo 自行添加需要mock的接口信息
};

module.exports = {
  url: usercenter,
  routers,
};
