import type { IRouter } from '@common/Router/definitions'

import type { IService } from '../../getServices'

import { ECustomerAddressesRoute } from '../../definitions'

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
  router.get(ECustomerAddressesRoute.Get, get(services))
  router.post(ECustomerAddressesRoute.Insert, insert(services))
}
