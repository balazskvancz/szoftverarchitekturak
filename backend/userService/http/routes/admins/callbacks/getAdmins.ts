import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import type { IService } from '../../../../getServices'
import { EUserRole } from '../../../../definitions'

/**
 * Az összes admin lekérdezését megvalósító végpont.
 * @param services - Services.
 */
export default function getAdmins (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const users = await services.usersService.getUsers(EUserRole.Admin)

    ctx.sendJson({
      users
    })
  }
}
