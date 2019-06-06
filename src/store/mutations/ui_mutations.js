const mutation = {
  CHANGE_LOADING_STATUS: (state, status) => {
    state.isLoadingShow = status;
  },
  CHANGE_LOADING_INNER_STATUS: (state, info) => {
    state.innerLoading.text = info.text;
    state.innerLoading.isShow = info.isShow;
  },
  CHANGE_TOAST_STATUS: (state, info) => {
    state.toast.text = info.text;
    state.toast.isShow = info.show;
  },
};
export default mutation;
