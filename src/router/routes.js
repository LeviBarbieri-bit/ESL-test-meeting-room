import { routes as auth } from '../modules/auth'
import { routes as shedule } from '../views/shedules'
import { routes as user } from '../views/user'
export default [
    ...auth,
    ...shedule,
    ...user
]
