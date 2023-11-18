import type { IRouter } from '@common/Router/definitions'

import courier from '@backend/common/middlewares/courier'

import type { IService } from '../../getServices'

import { ECourierWorkingDaysRoute } from '../../definitions'

import attachUser from '../middlewares/attachUser'

import getCalendar  from './courierWorkingDays/callbacks/getCalendar'
import set          from './courierWorkingDays/callbacks/set'

/**
 * Felveszi az összes, futárok munkabeosztásával kapcsolatos végpontot.
 * @param router    - Router.
 * @param services  - Services.
 */
export default function courierWorkingDaysRoutes (router: IRouter, services: IService): void {
  router.get(ECourierWorkingDaysRoute.GetCalendar, getCalendar(services))
    .registerMiddleware(attachUser(services))
    .registerMiddleware(courier)

  router.post(ECourierWorkingDaysRoute.Set, set(services))
    .registerMiddleware(attachUser(services))
    .registerMiddleware(courier)
}
