/*
 * @Author: Kaiser
 * @Date: 2019-06-10 10:02:16
 * @Last Modified by: Kaiser
 * @Last Modified time: 2019-06-10 10:26:45
 */
import mutation from './ui_mutations';
import action from './ui_actions';
import state from './ui_state';
import getter from './ui_getter';

const app = {
  namespaced: true,
  state,
  getters: getter,
  mutations: mutation,
  actions: action,
};

export default app;
