import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

export default {

  login(request) {
    return Vue.http.post('https://localhost:3001/auth/login', request)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));

  },

   isAuthenticated(request) {
   	console.log(request);
    return Vue.http.post('https://localhost:3001/auth/isAuthenticate', request)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));

  }

}