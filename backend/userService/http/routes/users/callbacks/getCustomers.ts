import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import type { IService } from '../../../../getServices'

/**
 * Az összes ügyfél lekérdezése.
 * @param services - Services.
 */
export default function getCostumers (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const users = await services.usersService.getCustomers()

    ctx.sendJson({
      users
    })
  }
}
