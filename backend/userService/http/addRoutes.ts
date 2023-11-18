import { EGatewayRoute }    from '@common/backend/definitions'
import healthCheckCallback  from '@common/backend/healthCheckCallback'

import type { IRouter } from '@common/Router/definitions'

import type { IService } from '../getServices'

import adminsRoutes             from './routes/adminsRoutes'
import couriersRoutes           from './routes/couriersRoutes'
import courierWorkingDaysRoutes from './routes/courierWorkingDaysRoutes'
import customerAddressessRoutes from './routes/customerAddressesRoutes'
import customersRoutes          from './routes/customersRoutes'
import usersRoutes              from './routes/usersRoutes'

/**
 * Az összes route felvétele.
 * @param router    - A router.
 * @param services  - Services.
 */
export default function addRoutes (router: IRouter, services: IService): void {
  router.get(EGatewayRoute.HealthCheck, healthCheckCallback)

  adminsRoutes(router, services)
  couriersRoutes(router, services)
  courierWorkingDaysRoutes(router, services)
  customerAddressessRoutes(router, services)
  customersRoutes(router, services)
  usersRoutes(router, services)
}
