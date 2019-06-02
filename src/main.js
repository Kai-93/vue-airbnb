// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
// 是否开启mock
const bOpenMock = false;

if (bOpenMock) {
  // 直接一般api
  // eslint-disable-next-line global-require
  require('./mock/mock');
}
Vue.config.productionTip = false;

window.$vue = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
