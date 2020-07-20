import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    doubleCount: state => state.count * 2
  },
  mutations: {
    addCount(state, payload = 1) {
      state.count += payload;
    }
  },
  actions: {
    asyncAddCount({ commit }) {
      setTimeout(() => {
        commit('addCount'); // 对应的mutations方法
      }, 1500);
    }
  },
  modules: {}
});
