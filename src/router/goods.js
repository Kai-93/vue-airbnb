import asyncImport from '@/utils/import_production';

export default [
  {
    path: '/goods_list',
    name: 'goods_list',
    component: asyncImport('goods/goods_manage/goods_list'),
  },
];
