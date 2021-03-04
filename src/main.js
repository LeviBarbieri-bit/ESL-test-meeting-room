import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store'
import router from './router'
import Vuex from "vuex";

Vue.config.productionTip = false

Vue.use(Vuex);
window._Vue = new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
