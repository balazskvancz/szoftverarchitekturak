import type { IRouter } from '@common/Router/definitions'

import attachUser from '@backend/common/middlewares/attachUser'

import type { IService } from '../../getServices'

import { EPackagesRoute } from '../../definitions'

import get            from './packages/get'
import getById        from './packages/getById'
import getLifeCycles  from './packages/getLifeCycles'
import insert         from './packages/insert'

/**
 * Felveszi az összes csomagokkal kapcsolatos végpontot.
 * @param router    - A router.
 * @param services  - Services.
 */
export default function packagesRoutes (router: IRouter, services: IService): void {
  router.get(EPackagesRoute.Get, get(services))
    .registerMiddleware(attachUser)

  router.get(EPackagesRoute.GetById, getById(services))
    .registerMiddleware(attachUser)

  router.get(EPackagesRoute.GetLifeCycles, getLifeCycles(services))
    .registerMiddleware(attachUser)

  router.post(EPackagesRoute.Insert, insert(services))
    .registerMiddleware(attachUser)
}
