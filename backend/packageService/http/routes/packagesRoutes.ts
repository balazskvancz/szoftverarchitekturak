import type { IRouter } from '@common/Router/definitions'

import type { IService } from '../../getServices'

import { EPackagesRoute } from '../../definitions'

import insert from './packages/insert'

/**
 * Felveszi az összes csomagokkal kapcsolatos végpontot.
 * @param router    - A router.
 * @param services  - Services.
 */
export default function packagesRoutes (router: IRouter, services: IService): void {
  router.post(EPackagesRoute.Insert, insert(services))
}
