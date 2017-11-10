import data from '../../../api/staticdata'
import * as rubs from './mutation-rubriques'
import * as _ from 'lodash'

// initial state
const state = {
  all: [],
  current: {},
  modalTitle: 'Modifier la rubrique'
}


// getters
const getters = {
  allRubriques: state => state.all,
  current: state => state.current,
  modalTitle: state => state.modalTitle,
}

// actions
const actions = {
  getAllRubriques ({ commit }) {
    data.getRubriques(rubriques => {
      commit(rubs.RECEIVE_RUBRIQUES, { rubriques })
    })
  },
  submitRubrique ({ commit }) {
    commit(rubs.SUBMIT_RUBRIQUE)
  },
  closeModal ({ commit }) {
    commit(rubs.CANCEL_EDIT_RUBRIQUE)
  }  
}

// mutations
const mutations = {
  [rubs.RECEIVE_RUBRIQUES] (state, { rubriques }) {
    state.all = rubriques
  },

  [rubs.ADD_RUBRIQUE] (state) {
    state.modalTitle = 'Ajouter la rubrique'
    state.current = {};
  },

  [rubs.EDIT_RUBRIQUE] (state, rub) {
    state.modalTitle = 'Modifier la rubrique'
    state.current = Object.assign({}, rub.item)
  },

  [rubs.DELETE_RUBRIQUE] (state, rub) {
    state.all.splice(state.all.indexOf(rub.item), 1);
  },

  [rubs.SUBMIT_RUBRIQUE] (state, current) {
    let rubriques = [];
    _.each(state.all, function(rub, i) {
      if(current.idRubriques === rub.idRubriques) {
        rub = current;
      }
      rubriques.push(rub);
    });
    if(_.isUndefined(current.idRubriques)) {
      current.idRubriques = 0;
      rubriques.unshift(current);
    }

    state.all = rubriques;
    state.current = {};
  },

  [rubs.CANCEL_EDIT_RUBRIQUE] (state) {
    state.current = {};
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}