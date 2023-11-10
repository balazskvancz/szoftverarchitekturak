import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import type { IService } from '@userService/getServices'

/**
 * Az összes felhasználó lekérdezése.
 * @param services - Services.
 */
export default function get (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const users = await services.users.getAllUsers()

    ctx.sendJson({
      users
    })
  }
}
