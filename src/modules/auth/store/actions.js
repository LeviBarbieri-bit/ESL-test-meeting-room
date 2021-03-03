import * as types from './mutation-type'
import services from '@/http'

export const ActionDoLogin = (context, payload) => {
    console.log(payload)
}

export const ActionSetUser = ({ commit }, payload) => {
    commit(types.SET_USER, payload)
}

export const ActionSetToken = ({ commit }, payload) => {
    commit(types.SET_TOKEN, payload)
}