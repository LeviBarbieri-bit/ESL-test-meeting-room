import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import VueResource from 'vue-resource'
//import store from './store'
import Axios from 'axios'

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.config.productionTip = false
Vue.use(VueResource)
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
