import type { IRouter } from '@common/Router/definitions'

import type { IService } from '../getServices'

import authRoutes from './routes/authRoutes'

/**
 * Az összes route felvétele.
 * @param router    - A router.
 * @param services  - Services.
 */
export default function addRoutes (router: IRouter, services: IService): void {
  authRoutes(router, services)
}
