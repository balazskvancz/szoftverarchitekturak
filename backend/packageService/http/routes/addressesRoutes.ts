import type { IRouter } from '@common/Router/definitions'

import type { IService } from '../../getServices'

import { EAddressesRoute } from '../../definitions'

import getById  from './addresses/getById'
import getByIds from './addresses/getByIds'
import insert   from './addresses/insert'

/**
 * Felveszi az öszes címekkel kapcsolatos végpontot.
 * @param router    - A router.
 * @param services  - Services.
 */
export default function addressesRoutes (router: IRouter, services: IService): void {
  router.get(EAddressesRoute.GetById, getById(services))
  router.post(EAddressesRoute.GetByIds, getByIds(services))
  router.post(EAddressesRoute.Insert, insert(services))
}
