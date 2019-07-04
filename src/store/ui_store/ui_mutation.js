/*
 * @Author: Kaiser
 * @Date: 2019-06-10 10:26:35
 * @Last Modified by: Kaiser
 * @Last Modified time: 2019-06-26 15:57:36
 */
import { Message } from 'element-ui';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const mutation = {
  /**
   * NProgress动画控制器 start-开始 true-结束
   */
  nprogressHandler: (status = 'start') => {
    NProgress[status]();
  },
  /**
   * 展示信息
   * @param data
   * {
   *  type：展示信息类型，依照elementui中Message的类型
   *  msg：展示具体信息
   * }
   */
  messageHandler: (state, data) => {
    if (data.type && Message[data.type]) {
      Message[data.type](data.msg);
      return undefined;
    }
    throw new Error('please enter the correct type of information');
  },
  /**
   * 控制导航菜单的显示隐藏
   * @param status false-隐藏 true-显示
   */
  navMemuHandler(state) {
    state.bIsNavMenuCollapse = !state.bIsNavMenuCollapse;
  },
  /**
   * 增加标签
   * @param {Object} state
   * @param {Object} route
   */
  addTab(state, route) {
    const tabs = state.tabs;
    const newTab = {
      name: route.name,
      meta: {
        // 用于标签的名字
        name: route.meta.name,
      },
      fullPath: route.fullPath,
      closable: route.meta.name !== '首页',
    };
    const index = state.tabs.findIndex(tab => tab.name === route.name);
    // 若标签数据中已有，则返回下标，并刷新数据
    if (index !== -1) {
      tabs[index] = newTab;
      return;
    }
    tabs.push(newTab);
  },
  /**
   * 移除当前选择的标签
   * @param {Object} state - store
   * @param {Object} route - 当前需要移除的标签（路由）
   * @return {Boolean} true - 删除成功 false - 删除失败
   */
  removeTab(state, route) {
    const index = state.tabs.findIndex(tab => tab.name === route.name);
    state.tabs.splice(index, 1);
  },
};
export default mutation;
