import type { IRouter } from '@common/Router/definitions'

import type { IService } from '../../getServices'

import { ECustomersRoute } from '../../definitions'

import get      from './customers/callbacks/get'
import getById  from './customers/callbacks/getById'
import insert   from './customers/callbacks/insert'
import update   from './customers/callbacks/update'

/**
 * Felveszi az összes, ügyfelekkel kapcsolatos végpontot.
 * @param router    - Router.
 * @param services  - Services.
 */
export default function customersRoutes (router: IRouter, services: IService): void {
  router.get(ECustomersRoute.Get, get(services))
  router.get(ECustomersRoute.GetById, getById(services))
  router.post(ECustomersRoute.Insert, insert(services))
  router.put(ECustomersRoute.Update, update(services))
}
