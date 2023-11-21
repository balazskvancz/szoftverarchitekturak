import type { IRouter } from '@common/Router/definitions'

import attachUser from '@backend/common/middlewares/attachUser'
import courier    from '@backend/common/middlewares/courier'

import type { IService } from '../../getServices'

import { EJobsRoute } from '../../definitions'

import getNextJob from './jobs/callbacks/getNextJob'

/**
 * Felveszi az összes feladatokkal kapcsolatos route-okat.
 * @param router    - A router.
 * @param services  - Services.
 */
export default function jobsRoutes (router: IRouter, services: IService): void {
  router.get(EJobsRoute.GetNextJob, getNextJob(services))
    .registerMiddleware(attachUser)
    .registerMiddleware(courier)
}
