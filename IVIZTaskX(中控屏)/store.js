import { createStore } from 'vuex'

const store = createStore({
  state: {
	   isAuthLogin: false,
  },
  mutations: {
	// 改变isAuthLogin的值
	  setAuthLogin(state, payload) {
		  state.isAuthLogin  = payload;
		},
		
  },
  actions: {
	  saveState({ state }) {
	        // 将状态保存到 localStorage
	        localStorage.setItem('isAuthLogin', JSON.stringify(state.isAuthLogin));
	      },
	  loadState({ commit }) {
			// 从 localStorage 加载状态
			const savedState = localStorage.getItem('isAuthLogin');
			if (savedState) {
			  // const state = JSON.parse(savedState);
			  commit('setAuthLogin', savedState);
			}
		  }
  },
})
// 在页面加载时调用 loadState 动作
store.dispatch('loadState');
export default store
