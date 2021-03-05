import { routes as auth } from '../modules/auth'
import { routes as user } from '../views/user'
import { routes as shedule } from '../views/shedule'

export default [
    ...auth,
    ...user,
    ...shedule,
]
