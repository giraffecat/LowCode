import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    panelSize: [390, 844], // 画布大小
    widgets: [], // 画布组件
  },
  mutations: {
    setWidgets(state, widgets = []) {
      // state.widgets = widgets;
      Vue.set(state, 'widgets', widgets)
    },
    setPenelSize(state, panelSize = [390, 844]) {
      state.panelSize = panelSize;
    }
  },
  actions: {},
  modules: {},
});
