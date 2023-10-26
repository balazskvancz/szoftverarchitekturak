import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import Error from '@userService/Error'

import type { IService } from '@userService/getServices'

/**
 * Egy új futár felvételét megvalósító végpont.
 * @param services - Services.
 */
export default function setWorkingDay (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const userData = ctx.getBody<string>()

    if (!Validator.isNonEmptyString(userData)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_POSTDATA,
        message: 'Hiányzó dátum!'
      })

      return
    }

    // TODO: user azonosító elkérése + validálása.
    const isSuccessfull = await services.courierWorkingDaysService.insert(5, userData)

    if (!isSuccessfull) {
      ctx.sendError({
        code: Error.codes.ERR_DB_INSERT,
        message: Error.messages.ERR_DB_INSERT
      })

      return
    }

    ctx.sendOk()
  }
}
