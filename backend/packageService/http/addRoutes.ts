import { EGatewayRoute }    from '@common/backend/definitions'
import healthCheckCallback  from '@common/backend/healthCheckCallback'

import type { IRouter } from '@common/Router/definitions'

import type { IService } from '../getServices'

import addressesRoutes          from './routes/addressesRoutes'
import dimensionsRoutes         from './routes/dimensRoutes'
import packageLifeCyclesRoutes  from './routes/packageLifeCyclesRoutes'
import packagesRoutes           from './routes/packagesRoutes'

/**
 * Az összes route felvétele.
 * @param router    - A router.
 * @param services  - Services.
 */
export default function addRoutes (router: IRouter, services: IService): void {
  router.get(EGatewayRoute.HealthCheck, healthCheckCallback)

  addressesRoutes(router, services)
  dimensionsRoutes(router, services)
  packageLifeCyclesRoutes(router, services)
  packagesRoutes(router, services)
}
