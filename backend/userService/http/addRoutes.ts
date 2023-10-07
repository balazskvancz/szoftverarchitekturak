import type { IRouter } from '@common/Router/definitions'

import type { IService } from '../getServices'

import usersRoutes from './routes/usersRoutes'

/**
 * Az összes route felvétele.
 * @param router    - A router.
 * @param services  - Services.
 */
export default function addRoutes (router: IRouter, services: IService): void {
  usersRoutes(router, services)
}
