/*
 * @Author: Kaiser
 * @Date: 2019-06-10 10:26:24
 * @Last Modified by: Kaiser
 * @Last Modified time: 2019-06-11 10:56:52
 */
const action = {
  /**
   * 展示进度条
   * @param {Object} {commit} 默认参数
   * @param {String} status  start or done
   */
  setNProgress({ commit }, status = 'start') {
    if (status === 'start') {
      commit('START_NPROGRESS');
      return;
    }
    if (status === 'done') {
      commit('DONE_NPROGRESS');
      return;
    }
    throw new Error('please enter a correct value of status');
  },
  /**
   * 错误信息提示
   * @param {Object} {commit} 默认参数
   * @param {String} message 展示的是信息
   */
  showErrorMessage({ commit }, message) {
    commit('SHOW_MESSAGE', { type: 'error', msg: message.toString() });
  },
};

export default action;
