import type { IRouter } from '@common/Router/definitions'

import type { IService } from '../../getServices'

import { EAuthRoute } from '../../definitions'

import getUser from './callbacks/getUser'
import getRole from './callbacks/getRole'
import login from './callbacks/login'
import logout from './callbacks/logout'


/**
 * Felveszi az összes autentikációval kapcsolatos végpontot.
 * @param router    - Router.
 * @param services  - Services.
 */
export default function authRoutes (router: IRouter, services: IService): void {
  router.get(EAuthRoute.GetUser, getUser(services))
  router.get(EAuthRoute.GetRole, getRole(services))
  router.post(EAuthRoute.Login, login(services))
  router.post(EAuthRoute.Logout, logout(services))
}
