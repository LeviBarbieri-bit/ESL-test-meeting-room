import * as types from './mutation-types'

export default {
  [types.SET_SHEDULES] (state, payload) {
    state.sheduleslist = payload
  }
}
