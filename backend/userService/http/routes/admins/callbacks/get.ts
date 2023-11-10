import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import type { IGetAllAdminsResponse } from '@userService/definitions'

import type { IService } from '@userService/getServices'

/**
 * Az összes admin lekérdezését megvalósító végpont.
 * @param services - Services.
 */
export default function get (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const admins = await services.users.getUsers('admin')

    const data: IGetAllAdminsResponse = {
      admins
    }

    ctx.sendJson(data)
  }
}
