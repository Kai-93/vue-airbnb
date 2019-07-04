import asyncImport from '@/utils/import_production';

export default [
  {
    path: 'goods/goods_list',
    name: 'goods_list',
    meta: {
      name: '商品列表',
    },
    component: asyncImport('goods/goods_list'),
  },
  {
    path: 'goods/goods_detail',
    name: 'goods_detail',
    meta: {
      name: '商品详情',
    },
    component: asyncImport('goods/goods_detail'),
  },
];
