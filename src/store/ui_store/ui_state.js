/*
 * @Author: Kaiser
 * @Date: 2019-06-10 09:50:18
 * @Last Modified by: Kaiser
 * @Last Modified time: 2019-06-26 14:36:22
 */

const tabs = JSON.parse(sessionStorage.getItem('tabs')) || [
  {
    // 路由的名字
    name: 'home',
    meta: {
      // 用于标签的名字
      name: '首页',
    },
    fullPath: '/',
    closable: false,
  },
];
const state = {
  // 导航菜单是否收缩
  bIsNavMenuCollapse: false,
  /**
   * 页面标签数组
   * sessionStorage中有保存的值，则用其值，反之，只有首页
   */
  tabs,
};

export default state;
