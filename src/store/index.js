import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    panelSize: [390, 844], // 画布大小
    widgets: [], // 画布组件
    pages:[],
    curPage:0,
  },
  mutations: {
    setWidgets(state, widgets = []) {
      // state.widgets = widgets;
      Vue.set(state, 'widgets', widgets)
    },
    setPage(state, page) {
      state.curPage = page;
    },
    setPenelSize(state, panelSize = [390, 844]) {
      state.panelSize = panelSize;
    },
    saveWidgets(state,widgets){
      state.pages.push(widgets)
    },
    newPage(state, widgets){
      state.pages.push([]);
    },
    updateWidgets(state,[updatePage, widgets]){
      state.pages[updatePage] = widgets;
    },
    deletePage(state, deletePage){
      state.pages.splice(deletePage, 1);
    }
  },
  actions: {},
  modules: {},
});
