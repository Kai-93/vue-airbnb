import mutation from '../mutations/ui_mutations';
import action from '../actions/ui_actions';
import state from '../states/ui_state';
import getter from '../getters/ui_getter';

const app = {
  namespaced: true,
  state,
  getters: getter,
  mutations: mutation,
  actions: action,
};

export default app;
