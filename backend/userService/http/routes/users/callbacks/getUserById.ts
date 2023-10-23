import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import type { IService }  from '../../../../getServices'
import Error              from '../../../../Error'

import type { IGetUserByIdResponse } from '../../../../definitions'

/**
 * Egy felhasználó lekérdezése id alapján.
 * @param services - Services.
 */
export default function getUserById (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const { id } = ctx.getRouteParams()

    if (!Validator.isPositiveNumber(id)) {
      ctx.sendError({
        code: Error.codes.ERR_INVALID_ID,
        message: Error.messages.ERR_INVALID_ID
      })

      return
    }

    const user = await services.usersService.getUserById(id)

    const data: IGetUserByIdResponse = {
      user
    }

    ctx.sendJson(data)
  }
}
