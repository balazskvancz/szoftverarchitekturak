import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import Validator  from '@common/Validator/Validator'

import type { IService } from '@userService/getServices'

import { EUserRole }  from '@userService/definitions'
import Error          from '@userService/Error'

/**
 * Adott azonosítóval rendelkező admin soft törlését  megvalósító végpont.
 * @param services - Services.
 */
export default function deleteAdmin (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const { id } = ctx.getRouteParams()

    if (!Validator.isPositiveNumber(id)) {
      ctx.sendError({
        code: Error.codes.ERR_INVALID_ID,
        message: Error.messages.ERR_INVALID_ID
      })

      return
    }

    const isSuccessfull = await services.usersService.deleteUser(id, EUserRole.Admin)

    if (!isSuccessfull) {
      ctx.sendError({
        code: Error.codes.ERR_DB_DELETE,
        message: Error.messages.ERR_DB_DELETE
      })
    }

    ctx.sendOk()
  }
}
