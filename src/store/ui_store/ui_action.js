/*
 * @Author: Kaiser
 * @Date: 2019-06-10 10:26:24
 * @Last Modified by: Kaiser
 * @Last Modified time: 2019-06-10 10:26:48
 */
const action = {
  setNProgress({ commit }, status = 'start') {
    if (status === 'start') {
      commit('START_NPROGRESS');
      return;
    }
    commit('DONE_NPROGRESS');
  },
};

export default action;
