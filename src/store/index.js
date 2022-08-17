import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    panelSize: [390, 844], // 画布大小
    widgets: [], // 画布组件
    pages:[],
    count:0
  },
  mutations: {
    setWidgets(state, widgets = []) {
      // state.widgets = widgets;
      Vue.set(state, 'widgets', widgets)
    },
    setPenelSize(state, panelSize = [390, 844]) {
      state.panelSize = panelSize;
    },
    saveWidgets(state,widgets){
      const obj={widgets:widgets,value:state.count++}
      state.pages.push(obj)
    },
    updateWidgets(state,[value,widgets]){
      for(let i in state.pages){
        if(state.pages[i].value==value){
          state.pages[i].widgets=widgets;
          break;
        }
      }
    },
    deletePage(state,data){
      for(let i in state.pages){
        if(state.pages[i].value==data){
          state.pages.splice(i,1);
          break;
        }
      }
    }
  },
  actions: {},
  modules: {},
});
