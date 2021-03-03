import * as types from './mutation-type'

export default {
    [types.SET_USER] (state, payload) {
        state.user = payload
    },

    [types.SET_USER] (state, payload) {
        state.token = payload
    }
}