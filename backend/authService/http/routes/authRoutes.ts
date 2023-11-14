import type { IRouter } from '@common/Router/definitions'

import type { IService } from '../../getServices'

import { EAuthRoute } from '../../definitions'

import getByHash  from './callbacks/getByHash'
import getDigest  from './callbacks/getDigest'
import login      from './callbacks/login'
import logout     from './callbacks/logout'

/**
 * Felveszi az összes autentikációval kapcsolatos végpontot.
 * @param router    - Router.
 * @param services  - Services.
 */
export default function authRoutes (router: IRouter, services: IService): void {
  router.get(EAuthRoute.GetByHash, getByHash(services))
  router.get(EAuthRoute.GetDigest, getDigest(services))
  router.post(EAuthRoute.Login, login(services))
  router.post(EAuthRoute.Logout, logout(services))
}
