import type { IRouter } from '@common/Router/definitions'

import type { IService } from '../../getServices'

import { ECustomerAddressesRoute } from '../../definitions'

import attachUser from '../middlewares/attachUser'

import deleteById from './customerAddresses/callbacks/deleteById'
import get        from './customerAddresses/callbacks/get'
import insert     from './customerAddresses/callbacks/insert'

/**
 * Felveszi az összes, ügyfelekkel kapcsolatos végpontot.
 * @param router    - Router.
 * @param services  - Services.
 */
export default function customerAddressessRoutes (router: IRouter, services: IService): void {
  router.delete(ECustomerAddressesRoute.DeleteById, deleteById(services))
    .registerMiddleware(attachUser(services))

  router.get(ECustomerAddressesRoute.Get, get(services))
    .registerMiddleware(attachUser(services))

  router.post(ECustomerAddressesRoute.Insert, insert(services))
    .registerMiddleware(attachUser(services))
}
