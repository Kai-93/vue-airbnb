const env = process.env;
const production = {
  cryptoBody: {
    key: 'ABCDEFGHABCDEFGH',
    iv: 'ABCDEFGHABCDEFGH',
  },
  cryptoHeader: {
    key: 'ABCDEFGHABCDEFGH',
    iv: 'ABCDEFGHABCDEFGH',
  },
  encryption: false,
  encryptionHeader: false,
  random: '880000003',
  modulePrefix: {
    // 商品模块
    product: '/api/product',
    // 账户资金
    account: '/api/account',
    // 资讯模块
    cms: '/api/cms',
    // 订单模块
    order: '/api/order',
    // 支付模块
    payment: '/api/payment',
    // 用户模块
    usercenter: '/api/usercenter',
    // 公共模块
    general: '/api/general',
    //爬虫
    crawler: '/api/crawler',
    //财务结算
    bill: '/api/bill',
  },
  imageUploadUrl: '/api/upload/image',
};
const development = Object.assign(Object.assign({}, production), {
  encryptionHeader: false,
});
export default {
  name: 'miaosuan-oms',
  env: env,
  dev: {
     port: 6800,
    proxyTable: {
      '/api': {
        target: 'http://192.168.1.8:8081/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
        cookieDomainRewrite: {
          '*': 'localhost',
        },
      },
    },
  },
  production: production,
  development: development,
};
