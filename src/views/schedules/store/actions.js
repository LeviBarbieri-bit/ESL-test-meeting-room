import services from '@/http'
import * as types from './mutation-type'

export const ActionAddSchedules = (context, payload) => (
    services.schedules.addOnSchedules(payload)
)

export const ActionShowSchedules = ({commit}) => (
    services.schedules.scheduleList().then(res => {
    
    commit(types.SET_SCHEDULES, res.data)
   })
) 

