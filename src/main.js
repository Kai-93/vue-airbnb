/*
 * @Author: Kaiser
 * @Date: 2019-06-10 09:50:36
 * @Last Modified by: Kaiser
 * @Last Modified time: 2019-06-25 13:21:18
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from '_modules/element-ui';
import '_modules/element-ui/lib/theme-chalk/index.css';
import '_modules/normalize.css';
import App from './App';
import router from './router';
import store from './store';

// https://cn.vuejs.org/v2/api/index.html#productionTip
// false - 启动时不产生生产提示 true - 生成
Vue.config.productionTip = false;
Vue.use(ElementUI);
window.$vue = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});

// window.$vue = new Vue({
//   router,
//   store,
//   render: h => h(App),
// }).$mount('#app');
