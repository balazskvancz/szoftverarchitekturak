import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import type { IService } from '../../../../getServices'

/**
 * Az összes futár lekérdezését megvalósító végpont.
 * @param services - Services.
 */
export default function getCouriers (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const users = await services.usersService.getCouriers()

    ctx.sendJson({
      users
    })
  }
}
