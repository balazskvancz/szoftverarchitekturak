import type { IRouter } from '@common/Router/definitions'

import type { IService } from '../../getServices'

import { EUsersRoute } from '../../definitions'
import { EAdminsRoute } from './admins/callbacks/definitions'
import { ECourierRoute } from './couriers/callbacks/definitions'
import { ECustomersRoute } from './customers/callbacks/definitions'

import getAll from './users/callbacks/getAll'
import insert from './users/callbacks/insert'
import registration from './users/callbacks/register'
import getCustomers from './customers/callbacks/getCustomers'
import deleteCustomer from './customers/callbacks/deleteCustomer'
import updateCustomer from './customers/callbacks/updateCustomer'
import getCustomer from './customers/callbacks/getCustomer'
import getAdmins from './admins/callbacks/getAdmins'
import getAdmin from './admins/callbacks/getAdmin'
import getCouriers from './couriers/callbacks/getCouriers'
import getCourier from './couriers/callbacks/getCourier'
import deleteAdmin from './admins/callbacks/deleteAdmin'
import deleteCourier from './couriers/callbacks/deleteCourier'
import updateAdmin from './admins/callbacks/updateAdmin'
import updateCourier from './couriers/callbacks/updateCourier'
import registerCourier from './couriers/callbacks/registerCourier'
import undoDelete from './users/callbacks/undoDelete'

/**
 * Felveszi az összes felhasználókkal kapcsolatos végpontot.
 * @param router    - Router.
 * @param services  - Services.
 */
export default function usersRoutes (router: IRouter, services: IService): void {
  router.get(EUsersRoute.GetAll,  getAll(services))
  router.get(ECustomersRoute.GetCustomers, getCustomers(services))
  router.get(ECustomersRoute.GetCustomer, getCustomer(services))
  router.get(EAdminsRoute.GetAdmins, getAdmins(services))
  router.get(EAdminsRoute.GetAdmin, getAdmin(services))
  router.get(ECourierRoute.GetCouriers, getCouriers(services))
  router.get(ECourierRoute.GetCourier, getCourier(services))
  router.post(EUsersRoute.Insert, insert(services))
  router.post(EUsersRoute.Register, registration(services))
  router.post(ECourierRoute.RegisterCourier, registerCourier(services))
  router.delete(ECustomersRoute.DeleteCustomer, deleteCustomer(services))
  router.delete(EAdminsRoute.DeleteAdmin, deleteAdmin(services))
  router.delete(ECourierRoute.DeleteCourier, deleteCourier(services))
  router.put(ECustomersRoute.UpdateCustomer, updateCustomer(services))
  router.put(EAdminsRoute.UpdateAdmin, updateAdmin(services))
  router.put(ECourierRoute.UpdateCourier, updateCourier(services))
  router.put(EUsersRoute.UndoDelete, undoDelete(services))
}
