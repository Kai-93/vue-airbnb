'use strict';
const merge = require('webpack-merge');
const productionEnv = require('./production.env.js');

module.exports = merge(productionEnv, {
  BUILD_ENV: 'local',
  API_DOMAIN: 'http://localhost:8080',
});
