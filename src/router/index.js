import Vue from 'vue';
import Router from 'vue-router';
import asyncImport from '@/utils/import_production';
import routes from './routes';

Vue.use(Router);

const router = new Router({
  routes: [
    // 登录页面
    {
      path: '/login',
      name: 'login',
      component: asyncImport('login'),
    },
  ],
});

const timer = setTimeout(() => {
  clearTimeout(timer);

  console.log(routes);

  router.addRoutes([
    // 主页面
    {
      path: '/',
      name: 'layout',
      redirect: '/home',
      component: asyncImport('layout'), // 页面框架
      children: routes,
      meta: {
        name: '首页',
      },
    },
  ]);
}, 1000);

export default router;
