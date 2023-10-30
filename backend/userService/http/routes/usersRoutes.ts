import type { IRouter } from '@common/Router/definitions'

import type { IService } from '../../getServices'

import { EUsersRoute } from '../../definitions'

import getAll           from './users/callbacks/getAll'
import getUserById      from './users/callbacks/getUserById'
import insert           from './users/callbacks/insert'
import registration     from './users/callbacks/register'
import undoDelete       from './users/callbacks/undoDelete'
import getIdByEmailPass from './users/callbacks/getIdByEmailPass'

/**
 * Felveszi az összes felhasználókkal kapcsolatos végpontot.
 * @param router    - Router.
 * @param services  - Services.
 */
export default function usersRoutes (router: IRouter, services: IService): void {
  router.get(EUsersRoute.GetAll,  getAll(services))
  router.get(EUsersRoute.GetUserById, getUserById(services))
  router.get(EUsersRoute.GetIdByEmailPass, getIdByEmailPass(services))
  router.post(EUsersRoute.Insert, insert(services))
  router.post(EUsersRoute.Register, registration(services))
  router.put(EUsersRoute.UndoDelete, undoDelete(services))
}
