import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import Error from '@userService/Error'

import { EUserRole }      from '@userService/definitions'
import type { IService }  from '@userService/getServices'

/**
 * Adott azonosítóval rendelkező futár soft törlését  megvalósító végpont.
 * @param services - Services.
 */
export default function deleteCourier (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const { id } = ctx.getRouteParams()

    if (!Validator.isPositiveNumber(id)) {
      ctx.sendError({
        code: Error.codes.ERR_INVALID_ID,
        message: Error.messages.ERR_INVALID_ID
      })

      return
    }

    const isSuccessfull = await services.usersService.deleteUser(id, EUserRole.Courier)

    if (!isSuccessfull) {
      ctx.sendError({
        code: Error.codes.ERR_DB_DELETE,
        message: Error.messages.ERR_DB_DELETE
      })
    }

    ctx.sendOk()
  }
}
