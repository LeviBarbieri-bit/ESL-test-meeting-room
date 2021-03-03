import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)
Vue.config.devtools = true

export default new Vuex.Store({modules})