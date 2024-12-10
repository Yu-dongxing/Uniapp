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
  actions: {},
  // ....
})

export default store
