import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      userId:window.sessionStorage.getItem('userId')
  },
  mutations: {
    login (state, userId) {
      state.userId = userId
      window.localStorage.setItem('userId', userId)
      console.log(userId)
    }
  }
})
