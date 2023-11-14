import type { IRouter } from '@common/Router/definitions'

import type { IService } from '../../getServices'

import { EPackageLifeCyclesRoute } from '../../definitions'

import insert from './packageLifeCycles/insert'

/**
 * Felveszi az öszes csomag életciklusokkal kapcsolatos végpontot.
 * @param router    - A router.
 * @param services  - Services.
 */
export default function packageLifeCyclesRoutes (router: IRouter, services: IService): void {
  router.post(EPackageLifeCyclesRoute.Insert, insert(services))
}
