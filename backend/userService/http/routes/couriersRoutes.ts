import type { IRouter } from '@common/Router/definitions'

import type { IService } from '../../getServices'

import { ECourierRoute } from '../../definitions'

import courier from '@backend/common/middlewares/courier'

import attachUser from '../middlewares/attachUser'

import get                  from './couriers/callbacks/get'
import getById              from './couriers/callbacks/getById'
import getCurrentlyWorking  from './couriers/callbacks/getCurrentlyWorking'
import insert               from './couriers/callbacks/insert'
import isWorkingDay         from './couriers/callbacks/isWorkingDay'
import update               from './couriers/callbacks/update'

/**
 * Felveszi az összes, futárokkal kapcsolatos végpontot.
 * @param router    - Router.
 * @param services  - Services.
 */
export default function couriersRoutes (router: IRouter, services: IService): void {
  router.get(ECourierRoute.Get, get(services))
  router.get(ECourierRoute.GetById, getById(services))
  router.get(ECourierRoute.GetCurrentlyWorking, getCurrentlyWorking(services))
  router.post(ECourierRoute.Insert, insert(services))

  router.get(ECourierRoute.IsWorkingDay, isWorkingDay(services))
    .registerMiddleware(attachUser(services))
    .registerMiddleware(courier)

  router.put(ECourierRoute.Update, update(services))
}
