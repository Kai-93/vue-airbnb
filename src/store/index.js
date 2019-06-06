import Vue from '_modules/vue';
import Vuex from '_modules/vuex';
import ui from './modules/ui_module';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    ui,
  },
});
export default store;
