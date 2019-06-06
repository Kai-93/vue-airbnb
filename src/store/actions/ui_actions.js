const action = {
  showLoading({ commit }) {
    commit('CHANGE_LOADING_STATUS', true);
  },
  hideLoading({ commit }) {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      commit('CHANGE_LOADING_STATUS', false);
    }, 1000);
  },
  showInnerLoading({ commit, state }, text = '加载中...') {
    if (state.innerLoading.isShow) return;
    commit('CHANGE_LOADING_INNER_STATUS', { isShow: true, text });
  },
  hideInnerLoading({ commit }, text = '') {
    commit('CHANGE_LOADING_INNER_STATUS', { isShow: false, text });
  },
  showToast({ commit, state }, text) {
    if (state.toast.isShow) return;
    commit('CHANGE_TOAST_STATUS', { show: true, text });
  },
  hideToast({ commit }, text = '') {
    commit('CHANGE_TOAST_STATUS', { show: false, text });
  },
};

export default action;
