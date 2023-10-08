import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import type { IService } from '../../../../getServices'

/**
 * Az összes ügyfél lekérdezését megvalósító végpont.
 * @param services - Services.
 */
export default function getCustomers (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const users = await services.usersService.getCustomers()

    ctx.sendJson({
      users
    })
  }
}
