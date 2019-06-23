import Vue from 'vue';
import Router from 'vue-router';
// import getComponent from '@/utils/import_tool';

Vue.use(Router);
// eslint-disable-next-line import/no-dynamic-require
const getComponent = require(`@/utils/import_${process.env.BUILD_ENV}`).default;

export default new Router({
  routes: [
    {
      path: '/',
      name: 'pageName',
      component: getComponent('module_name/pageName'),
    },
  ],
});
