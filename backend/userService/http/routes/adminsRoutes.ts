import type { IRouter } from '@common/Router/definitions'

import type { IService } from '../../getServices'

import { EAdminsRoute } from '../../definitions'

import getById      from './admins/callbacks/getById'
import get          from './admins/callbacks/get'
import insert       from './admins/callbacks/insert'
import update       from './admins/callbacks/update'

/**
 * Felveszi az összes, adminokkal kapcsolatos végpontot.
 * @param router    - Router.
 * @param services  - Services.
 */

export default function adminsRoutes (router: IRouter, services: IService): void {
  router.get(EAdminsRoute.GetById, getById(services))
  router.get(EAdminsRoute.Get, get(services))
  router.post(EAdminsRoute.Insert, insert(services))
  router.put(EAdminsRoute.Update, update(services))
}
