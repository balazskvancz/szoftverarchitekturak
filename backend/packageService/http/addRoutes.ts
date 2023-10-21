import type { IRouter } from '@common/Router/definitions'

import type { IService } from '../getServices'

import dimensionsRoutes from './routes/dimensRoutes'

/**
 * Az összes route felvétele.
 * @param router    - A router.
 * @param services  - Services.
 */
export default function addRoutes (router: IRouter, services: IService): void {
  dimensionsRoutes(router, services)
}
