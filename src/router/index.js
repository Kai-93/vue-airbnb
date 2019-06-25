import Vue from 'vue';
import Router from 'vue-router';
import asyncImport from '@/utils/import_production';
import routes from './routes';

Vue.use(Router);

export default new Router({
  routes: [
    // 登录页面
    {
      path: '/login',
      name: 'login',
      component: asyncImport('login/login'),
    },
    // 主页面
    {
      path: '/',
      name: 'layout',
      component: asyncImport('layout/layout'), // 页面框架
      children: routes,
    },
  ],
});
