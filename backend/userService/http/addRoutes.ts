import type { IRouter } from '@common/Router/definitions'

import type { IService } from '../getServices'

import usersRoutes from './routes/usersRoutes'
import adminsRoutes from './routes/adminsRoutes'
import couriersRoutes from './routes/couriersRoutes'
import customersRoutes from './routes/customersRoutes'

/**
 * Az összes route felvétele.
 * @param router    - A router.
 * @param services  - Services.
 */
export default function addRoutes (router: IRouter, services: IService): void {
  usersRoutes(router, services)
  adminsRoutes(router, services)
  couriersRoutes(router, services)
  customersRoutes(router, services)
}
