import { routes as auth } from '../modules/auth'
import { routes as user } from '../views/user'
import { routes as schedules } from '../views/schedules'


export default [
    ...auth,
    ...user,
    ...schedules,
]
