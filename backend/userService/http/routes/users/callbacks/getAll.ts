import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import type { IService } from '@userService/getServices'

/**
 * Az összes felhasználó lekérdezése.
 * @param services - Services.
 */
export default function getAll (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const users = await services.usersService.getAllUsers()

    ctx.sendJson({
      users
    })
  }
}
