import Vue from 'vue'
import VueResource from 'vue-resource'
import services from './services'

Vue.use(VueResource)

const http = Vue.http

http.options.root = "http://127.0.0.1:4000/"

Object.keys(services).map(service => {
    services[service] = Vue.resource('', {}, service[service])
})
export { http }
export default services