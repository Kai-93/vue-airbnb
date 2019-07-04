import asyncImport from '@/utils/import_production';

export default [
  {
    path: 'home',
    name: 'home',
    meta: {
      name: '首页',
    },
    component: asyncImport('home'),
  },
];
