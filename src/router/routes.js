import { routes as auth } from '../modules/auth'
import { routes as shedule } from '../views/shedules'
export default [
    ...auth,
    ...shedule
]
