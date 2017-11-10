import Vue from 'vue'
import Vuex from 'vuex'
//import rubriques from './modules/rubriques/rubriques' 
import rubs from './modules/rubriques-v2/rubs' 
import auth from './modules/auth/auth' 
import dashboard from './modules/dashboard/dashboard' 

Vue.use(Vuex)

const state = {
  count: 0
}

const mutations = {
  INCREMENT (state) {
    state.count++
  },
  DECREMENT (state) {
    state.count--
  }
}

const actions = {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('INCREMENT')
    }, 200)
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    //rubriques,
    rubs,
    auth,
    dashboard
  }
})

export default store
