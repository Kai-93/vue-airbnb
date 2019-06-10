/*
 * @Author: Kaiser
 * @Date: 2019-06-10 10:26:35
 * @Last Modified by: Kaiser
 * @Last Modified time: 2019-06-10 10:37:31
 */
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
};
export default mutation;
