/*
 * @Author: Kaiser
 * @Date: 2019-06-10 09:51:38
 * @Last Modified by: Kaiser
 * @Last Modified time: 2019-06-10 10:30:40
 */
import Vue from 'vue';
import Vuex from '_modules/vuex';
import ui from './ui_store/ui_module';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    ui,
  },
});
export default store;
