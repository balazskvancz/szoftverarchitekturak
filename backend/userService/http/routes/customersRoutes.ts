import type { IRouter } from '@common/Router/definitions'

import type { IService } from '../../getServices'

import { ECustomersRoute } from '../../definitions'
import getCustomers from './customers/callbacks/getCustomers'
import getCustomer from './customers/callbacks/getCustomer'
import deleteCustomer from './customers/callbacks/deleteCustomer'
import updateCustomer from './customers/callbacks/updateCustomer'

/**
 * Felveszi az összes, ügyfelekkel kapcsolatos végpontot.
 * @param router    - Router.
 * @param services  - Services.
 */
export default function customersRoutes (router: IRouter, services: IService): void {
  router.get(ECustomersRoute.GetCustomers, getCustomers(services))
  router.get(ECustomersRoute.GetCustomer, getCustomer(services))
  router.delete(ECustomersRoute.DeleteCustomer, deleteCustomer(services))
  router.put(ECustomersRoute.UpdateCustomer, updateCustomer(services))
}
