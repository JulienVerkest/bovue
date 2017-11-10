import { AUTHENTICATE, AUTHENTICATE_FAILURE } from '../mutations-types'
import authService from '../../../services/auth'
import Vue from 'vue'

// initial State
const state = {
  token: null,
  failure: null
}

// const getters = {
//   isAuthenticated () {
//     return vueAuth.isAuthenticated()
//   }
// }

const actions = {

  login: ({commit}, request) => {
    return authService.login(request)
      .then((response) => commit(AUTHENTICATE, { response }))
      .catch((error) => commit(AUTHENTICATE_FAILURE, { error }));
  },

  isAuthenticated: ({commit}, request) => {
    return authService.isAuthenticated(request)
      .then((response) => commit(AUTHENTICATE, { response }))
      .catch((error) => commit(AUTHENTICATE_FAILURE, { error }));
  },

  forgotPwd: () => {
    var domain = location.hostname.split('.').slice(-2).join('.');

    // hack to make it work on local environment...
    if (domain == 'paris.lc') { domain = 'lestudio.mx' };

    window.open(
        'https://accounts.'+domain+'/account/send_password?returnUrl=escalade.'+domain+'&pop=1'
      , '_blank'
      , 'width=350,height=375,scrollbars=no,status=yes,resizable=no'
    );
  }

}

 // Mutation for when you use it as state property
const mutations = {

  [AUTHENTICATE] (state, response) {
    state.token = response.pcuid;
    localStorage.setItem('pcuid', JSON.stringify(response.pcuid));
    
  },

  [AUTHENTICATE_FAILURE] (state, error) {
    state.failure = error;
  },

  // other mutations

}


export default {
  state,
  //getters,
  mutations,
  actions
}