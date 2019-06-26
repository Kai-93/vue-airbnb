import asyncImport from '@/utils/import_production';

export default [
  {
    path: '/goods_list',
    name: 'goods_list',
    meta: {
      name: '商品列表',
    },
    component: asyncImport('goods/goods_manage/GoodsList'),
  },
  {
    path: '/goods_detail',
    name: 'goods_detail',
    meta: {
      name: '商品详情',
    },
    component: asyncImport('goods/goods_manage/GoodsDetail'),
  },
];
