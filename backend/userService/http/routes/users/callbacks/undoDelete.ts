import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import type { IService } from '../../../../getServices'
import Error from '../../../../Error'

/**
 * Egy adott azonosítóval rendelkező felhasználó törlésének visszaállítását megvalósító végpont.
 * @param services - Services.
 */
export default function undoDelete (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const { id } = ctx.getRouteParams()

    if (!Validator.isPositiveNumber(id)) {
      ctx.sendError({
        code: Error.codes.ERR_INVALID_ID,
        message: Error.messages.ERR_INVALID_ID
      })

      return
    }

    const isSuccessfull = await services.usersService.undoDelete(id)

    if (!isSuccessfull) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_POSTDATA,
        message: Error.messages.ERR_WRONG_POSTDATA
      })

      return
    }

    ctx.sendOk()
  }
}
