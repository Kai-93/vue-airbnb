import Vue from 'vue';
import Router from 'vue-router';
import pageName from '../pages/module_name/pageName';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'pageName',
      component: pageName,
    },
  ],
});
