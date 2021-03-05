import * as types from './mutation-type'

export default {
  [types.SET_SHEDULE] (state, payload) {
    state.shedulelist = payload
  },
  
}
