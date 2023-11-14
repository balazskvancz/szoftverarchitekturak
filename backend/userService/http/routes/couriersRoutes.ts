import type { IRouter } from '@common/Router/definitions'

import courier from '@backend/common/middlewares/courier'

import type { IService } from '../../getServices'

import { ECourierRoute } from '../../definitions'

import attachUser from '../middlewares/attachUser'

import deleteWorkingDay from './couriers/callbacks/deleteWorkingDay'
import getById          from './couriers/callbacks/getById'
import get              from './couriers/callbacks/get'
import insert           from './couriers/callbacks/insert'
import setWorkingDays   from './couriers/callbacks/setWorkingDays'
import update           from './couriers/callbacks/update'

/**
 * Felveszi az összes, futárokkal kapcsolatos végpontot.
 * @param router    - Router.
 * @param services  - Services.
 */
export default function couriersRoutes (router: IRouter, services: IService): void {
  router.delete(ECourierRoute.DeleteWorkingDay, deleteWorkingDay(services))
    .registerMiddleware(attachUser(services))
    .registerMiddleware(courier)

  router.get(ECourierRoute.GetById, getById(services))
  router.get(ECourierRoute.Get, get(services))
  router.post(ECourierRoute.Insert, insert(services))

  router.post(ECourierRoute.SetWorkingDays, setWorkingDays(services))
    .registerMiddleware(attachUser(services))
    .registerMiddleware(courier)

  router.put(ECourierRoute.Update, update(services))
}
