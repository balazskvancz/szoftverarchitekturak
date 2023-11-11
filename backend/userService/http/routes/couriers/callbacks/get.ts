import type { IGetAllCouriersResponse } from '@backend/userService/definitions'
import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import type { IService }  from '@userService/getServices'

/**
 * Az összes futár lekérdezését megvalósító végpont.
 * @param services - Services.
 */
export default function get (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const couriers = await services.couriers.getAll()

    const data: IGetAllCouriersResponse = {
      couriers
    }

    ctx.sendJson(data)
  }
}
