import type { IRouter } from '@common/Router/definitions'

import courier from '@backend/common/middlewares/courier'

import type { IService } from '../../getServices'

import { ECourierWorkingDaysRoute } from '../../definitions'

import attachUser from '../middlewares/attachUser'

import deleteByDate from './courierWorkingDays/callbacks/deleteByDate'
import get          from './courierWorkingDays/callbacks/get'
import insert       from './courierWorkingDays/callbacks/insert'

/**
 * Felveszi az összes, futárok munkabeosztásával kapcsolatos végpontot.
 * @param router    - Router.
 * @param services  - Services.
 */
export default function courierWorkingDaysRoutes (router: IRouter, services: IService): void {
  router.delete(ECourierWorkingDaysRoute.DeleteByDate, deleteByDate(services))
    .registerMiddleware(attachUser(services))
    .registerMiddleware(courier)

  router.get(ECourierWorkingDaysRoute.Get, get(services))
    .registerMiddleware(attachUser(services))
    .registerMiddleware(courier)

  router.post(ECourierWorkingDaysRoute.Insert, insert(services))
    .registerMiddleware(attachUser(services))
    .registerMiddleware(courier)
}
