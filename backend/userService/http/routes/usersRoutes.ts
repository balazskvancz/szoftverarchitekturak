import type { IRouter } from '@common/Router/definitions'

import type { IService } from '../../getServices'

import { EUsersRoute } from '../../definitions'

import get                    from './users/callbacks/get'
import getById                from './users/callbacks/getById'
import getByEmailAndPassword  from './users/callbacks/getByEmailAndPassword'

/**
 * Felveszi az összes felhasználókkal kapcsolatos végpontot.
 * @param router    - Router.
 * @param services  - Services.
 */
export default function usersRoutes (router: IRouter, services: IService): void {
  router.get(EUsersRoute.GetAll,  get(services))
  router.get(EUsersRoute.GetUserById, getById(services))
  router.post(EUsersRoute.GetByEmailAndPassword, getByEmailAndPassword(services))
}
