import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import type { IService } from '@userService/getServices'

/**
 * Egy új futár felvételét megvalósító végpont.
 * @param _services - Services.
 */
export default function setWorkingDay (_services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    // TODO: REFAKT.
    /*
    const userData = ctx.getBody<string>()

    if (!Validator.isNonEmptyString(userData)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_POSTDATA,
        message: 'Hiányzó dátum!'
      })

      return
    }

    const isSuccessfull = await services.courierWorkingDays.insert(5, userData)

    if (!isSuccessfull) {
      ctx.sendError({
        code: Error.codes.ERR_DB_INSERT,
        message: Error.messages.ERR_DB_INSERT
      })

      return
    }*/

    await Promise.resolve()

    ctx.sendOk()
  }
}
