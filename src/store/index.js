import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    panelSize: [390, 844], // 画布大小
    widgets: [], // 画布组件,
    // pages: [] // 画布数据
    pages: [],
  },
  mutations: {
    setWidgets(state, widgets = []) {
      // state.widgets = widgets;
      Vue.set(state, "widgets", widgets);
    },
    setPenelSize(state, panelSize = [390, 844]) {
      state.panelSize = panelSize;
    },
    addPage(state, page = {}) {
      state.pages.push(page);
    },
    setPages(state,pages=[]){
      state.pages = pages
    }
  },
  actions: {},
  modules: {},
});
