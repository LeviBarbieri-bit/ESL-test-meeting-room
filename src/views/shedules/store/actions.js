import services from '@/http'
import * as types from './mutation-types'

export const ActionShowShedules = ({ commit }) => (
     services.shedules.showShedules().then(res => {
      
      return commit(types.SET_SHEDULES, res.data)
    })
  )