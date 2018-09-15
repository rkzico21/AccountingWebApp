// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { Navbar } from 'bootstrap-vue/es/components'
import { Table } from 'bootstrap-vue/es/components'
import store from './store'
import axios from 'axios'


Vue.use(BootstrapVue);
Vue.use(Table);

Vue.use(Navbar);
Vue.config.productionTip = false


axios.defaults.baseURL= "http://localhost:5000/api/"//"https://2rtdu7y7ue.execute-api.us-west-2.amazonaws.com/Prod/api"   //"http://localhost:5000/api/"
Vue.prototype.$http = axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = "Bearer "+ token
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
