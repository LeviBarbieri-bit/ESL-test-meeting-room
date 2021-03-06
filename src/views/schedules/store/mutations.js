import * as types from './mutation-type'

export default {
  [types.SET_SCHEDULES] (state, payload) {
    state.schedules = payload
  },

}
