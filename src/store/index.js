import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    panelSize: [375, 667], // 画布大小
    widgets: [], // 画布组件
    pages:[],
    curPage: 0, 
    isPreview: false, // 是否处于预览状态,
    userInfo: {} //个人信息
  },
  mutations: {
    setWidgets(state, widgets = []) {
      // state.widgets = widgets;
      Vue.set(state, 'widgets', widgets)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    setPage(state, page) {
      state.curPage = page;
    },
    updateWidgets(state, widgets){
      // console.log(111);
      const curIdx = state.pages.findIndex(
        (page) => page.name.slice(2) == state.curPage
      );
      // console.log(curIdx);
      if(state.pages[curIdx]) state.pages[curIdx].widgets = widgets;
    },
    setPenelSize(state, panelSize = [375, 667]) {
      state.panelSize = panelSize;
    },
    saveWidgets(state,widgets){
      state.pages.push(widgets)
    },
    newPage(state, page){
      state.pages.push(page);
    },
    
    deletePage(state, deletePage){
      state.pages.splice(deletePage, 1);
    },

    setPreview(state,status){
      state.isPreview = status
    }
  },
  actions: {},
  modules: {},
});
