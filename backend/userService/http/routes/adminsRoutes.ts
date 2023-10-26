import type { IRouter } from '@common/Router/definitions'

import type { IService } from '../../getServices'

import { EAdminsRoute } from '../../definitions'

import deleteAdmin  from './admins/callbacks/deleteAdmin'
import getAdmin     from './admins/callbacks/getAdmin'
import getAdmins    from './admins/callbacks/getAdmins'
import updateAdmin  from './admins/callbacks/updateAdmin'

/**
 * Felveszi az összes, adminokkal kapcsolatos végpontot.
 * @param router    - Router.
 * @param services  - Services.
 */

export default function adminsRoutes (router: IRouter, services: IService): void {
  router.delete(EAdminsRoute.DeleteAdmin, deleteAdmin(services))
  router.get(EAdminsRoute.GetAdmin, getAdmin(services))
  router.get(EAdminsRoute.GetAdmins, getAdmins(services))
  router.put(EAdminsRoute.UpdateAdmin, updateAdmin(services))
}
