import type { IRouter } from '@common/Router/definitions'

import type { IService } from '../../getServices'

import { EUsersRoute } from '../../definitions'

import getAll from './users/callbacks/getAll'
import insert from './users/callbacks/insert'
import registration from './users/callbacks/registration'
import getCostumers from './users/callbacks/getCustomers'
import deleteCostumer from './users/callbacks/deleteCustomer'
import updateCostumer from './users/callbacks/updateCustomer'
import getCostumer from './users/callbacks/getCustomer'

/**
 * Felveszi az összes felhasználókkal kapcsolatos végpontot.
 * @param router    - Router.
 * @param services  - Services.
 */
export default function usersRoutes (router: IRouter, services: IService): void {
  router.get(EUsersRoute.GetAll,  getAll(services))
  router.post(EUsersRoute.Insert, insert(services))
  router.post(EUsersRoute.Register, registration(services))
  router.get(EUsersRoute.GetCustomers, getCostumers(services))
  router.delete(EUsersRoute.DeleteCustomer, deleteCostumer(services))
  router.put(EUsersRoute.UpdateCustomer, updateCostumer(services))
  router.get(EUsersRoute.GetCustomer, getCostumer(services))
}
