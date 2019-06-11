/*
 * @Author: Kaiser
 * @Date: 2019-06-10 10:26:35
 * @Last Modified by: Kaiser
 * @Last Modified time: 2019-06-10 18:10:57
 */
import { Message } from 'element-ui';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const mutation = {
  /**
   * NProgress动画开始
   */
  START_NPROGRESS: () => {
    NProgress.start();
  },
  /**
   * NProgress动画结束
   */
  DONE_NPROGRESS: () => {
    NProgress.done();
  },
  /**
   * 展示信息
   * @param data
   * {
   *  type：展示信息类型，依照elementui中Message的类型
   *  msg：展示具体信息
   * }
   */
  SHOW_MESSAGE: (state, data) => {
    if (data.type && Message[data.type]) {
      Message[data.type](data.msg);
      return undefined;
    }
    throw new Error('please enter the correct type of information');
  },
};
export default mutation;
