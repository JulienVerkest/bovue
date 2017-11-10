import Vue from 'vue'
import Router from 'vue-router'

import BootstrapVue from 'bootstrap-vue';
import Home from '../views/Home'
import Dashboard from '../components/Dashboard'
import Identification from '../components/Identification'
//import Rubriques from '../components/Rubriques'
import Rubs from '../components/Rubs'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(Router);
Vue.use(BootstrapVue);
// Vue.use(VueResource);

// const vueAuth = new VueAuthenticate(Vue.http, {
//   baseUrl: 'https://localhost:3001'
// })

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/identification',
      component: Identification
    },
    {
      path: '/dashboard',
      component: Dashboard
    },
    // {
    //   path: '/rubriques',
    //   component: Rubriques
    // },
    {
      path: '/rubriques-vue-tables-2',
      component: Rubs
    }
  ]
})
