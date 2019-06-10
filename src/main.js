/*
 * @Author: Kaiser
 * @Date: 2019-06-10 09:50:36
 * @Last Modified by: Kaiser
 * @Last Modified time: 2019-06-10 10:31:10
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import 'nprogress/nprogress.css';

import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

window.$vue = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
