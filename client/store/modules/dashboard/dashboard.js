import data from '../../../api/staticdata'
import { RECEIVE_HUBS } from '..//mutations-types'

const state = {
  allHubs: []
}

const getters = {
  hubs: state => state.allHubs
}

const actions = {
  getHubs ({ commit }) {
    data.getHubs(hubs => {
      console.log(hubs);
      commit(RECEIVE_HUBS, { hubs })
    })
  }
}

const mutations = {
  [RECEIVE_HUBS] (state, { hubs }) {
    state.allHubs = hubs
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}