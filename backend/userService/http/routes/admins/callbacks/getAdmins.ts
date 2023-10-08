import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import type { IService } from '../../../../getServices'

/**
 * Az összes admin lekérdezését megvalósító végpont.
 * @param services - Services.
 */
export default function getAdmins (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const users = await services.usersService.getAdmins()

    ctx.sendJson({
      users
    })
  }
}
