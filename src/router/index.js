import Vue from 'vue';
import Router from 'vue-router';
import asyncImport from '@/utils/import_production';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'pageName',
      component: asyncImport('module_name/pageName'),
    },
  ],
});
