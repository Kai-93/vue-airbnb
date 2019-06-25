/*
 * @Author: Kaiser
 * @Date: 2019-06-10 10:26:35
 * @Last Modified by: Kaiser
 * @Last Modified time: 2019-06-25 21:34:44
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
    state.booIsNavMenuCollapse = !state.booIsNavMenuCollapse;
  },
};
export default mutation;
