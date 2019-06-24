'use strict';
const merge = require('webpack-merge');
const productionEnv = require('./production.env.js');

module.exports = merge(productionEnv, {
  BUILD_ENV: 'development',
  API_DOMAIN: 'http://shopadmin.miaosuankeji.com',
});
