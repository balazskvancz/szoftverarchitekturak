import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import type { IService } from '../../../../getServices'
import { EUserRole } from '../../../../definitions'

/**
 * Az összes ügyfél lekérdezését megvalósító végpont.
 * @param services - Services.
 */
export default function getCustomers (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const users = await services.usersService.getUsers(EUserRole.Customer)

    ctx.sendJson({
      users
    })
  }
}
