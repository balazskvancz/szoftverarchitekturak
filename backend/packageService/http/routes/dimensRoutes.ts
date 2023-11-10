import type { IRouter } from '@common/Router/definitions'

import type { IService } from '../../getServices'

import { EDimensionsRoute } from '../../definitions'

import deleteById from './dimensions/deleteById'
import getAll     from './dimensions/getAll'
import getById    from './dimensions/getById'
import insert     from './dimensions/insert'
import update     from './dimensions/update'

/**
 * Felveszi az összes dimenziókkal kapcsolatos végpontot.
 * @param router    - A router.
 * @param services  - Services.
 */
export default function dimensionsRoutes (router: IRouter, services: IService): void {
  router.delete(EDimensionsRoute.DeleteById, deleteById(services))
  router.get(EDimensionsRoute.GetAll, getAll(services))
  router.get(EDimensionsRoute.GetById, getById(services))
  router.post(EDimensionsRoute.Insert, insert(services))
  router.put(EDimensionsRoute.Update, update(services))
}
