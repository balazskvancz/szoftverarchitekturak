import type { IRouter } from '@common/Router/definitions'

import type { IService } from '../../getServices'

import { ECourierRoute } from '../../definitions'

import getById          from './couriers/callbacks/getById'
import get              from './couriers/callbacks/get'
import insert           from './couriers/callbacks/insert'
import update           from './couriers/callbacks/update'

/**
 * Felveszi az összes, futárokkal kapcsolatos végpontot.
 * @param router    - Router.
 * @param services  - Services.
 */
export default function couriersRoutes (router: IRouter, services: IService): void {
  router.get(ECourierRoute.GetById, getById(services))
  router.get(ECourierRoute.Get, get(services))
  router.post(ECourierRoute.Insert, insert(services))
  router.put(ECourierRoute.Update, update(services))
}
