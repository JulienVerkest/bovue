import data from '../../../api/staticdata'
import { ADD_RUBRIQUE, EDIT_RUBRIQUE, DELETE_RUBRIQUE, CANCEL_EDIT_RUBRIQUE, SUBMIT_RUBRIQUE, RECEIVE_RUBRIQUES } from '..//mutations-types'
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
      commit(RECEIVE_RUBRIQUES, { rubriques })
    })
  },
  submitRubrique ({ commit }) {
    commit(SUBMIT_RUBRIQUE)
  },
  closeModal ({ commit }) {
    commit(CANCEL_EDIT_RUBRIQUE)
  }  
}

// mutations
const mutations = {
  [RECEIVE_RUBRIQUES] (state, { rubriques }) {
    state.all = rubriques
  },

  [ADD_RUBRIQUE] (state) {
    state.modalTitle = 'Ajouter la rubrique'
    state.current = {};
  },

  [EDIT_RUBRIQUE] (state, rub) {
    state.modalTitle = 'Modifier la rubrique'
    state.current = Object.assign({}, rub.row)
  },

  [DELETE_RUBRIQUE] (state, rub) {
    let deletes = _.remove(state.all, function(n) { 
      return parseInt(n.idRubriques) !== parseInt(rub.row.idRubriques);
    });
    state.all = deletes;
  },

  [SUBMIT_RUBRIQUE] (state, current) {
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

  [CANCEL_EDIT_RUBRIQUE] (state) {
    state.current = {};
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}