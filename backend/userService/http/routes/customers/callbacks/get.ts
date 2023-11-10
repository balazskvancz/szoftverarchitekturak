import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import type { IService }  from '@userService/getServices'

import type { IGetAllCustomersResponse } from '@userService/definitions'

/**
 * Az összes ügyfél lekérdezését megvalósító végpont.
 * @param services - Services.
 */
export default function get (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const customers = await services.customers.getAll()

    const data: IGetAllCustomersResponse = {
      customers
    }

    ctx.sendJson(data)
  }
}
