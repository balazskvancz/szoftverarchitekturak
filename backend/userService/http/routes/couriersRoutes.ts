import type { IRouter } from '@common/Router/definitions'

import type { IService } from '../../getServices'

import { ECourierRoute } from '../../definitions'
import getCouriers from './couriers/callbacks/getCouriers'
import getCourier from './couriers/callbacks/getCourier'
import registerCourier from './couriers/callbacks/registerCourier'
import deleteCourier from './couriers/callbacks/deleteCourier'
import updateCourier from './couriers/callbacks/updateCourier'

/**
 * Felveszi az összes, futárokkal kapcsolatos végpontot.
 * @param router    - Router.
 * @param services  - Services.
 */
export default function couriersRoutes (router: IRouter, services: IService): void {
  router.get(ECourierRoute.GetCouriers, getCouriers(services))
  router.get(ECourierRoute.GetCourier, getCourier(services))
  router.post(ECourierRoute.RegisterCourier, registerCourier(services))
  router.delete(ECourierRoute.DeleteCourier, deleteCourier(services))
  router.put(ECourierRoute.UpdateCourier, updateCourier(services))
}
