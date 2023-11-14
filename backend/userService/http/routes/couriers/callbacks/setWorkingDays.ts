import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import Error from '@common/backend/Error'

import type { IService } from '@userService/getServices'

interface ISetWorkingDaysRequest {
  readonly dates: string[]
}

/**
 * Egy új futár felvételét megvalósító végpont.
 * @param _services - Services.
 */
export default function setWorkingDays (_services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const postData = ctx.getBody<ISetWorkingDaysRequest>()

    if (!Validator.isDefined(postData)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_POSTDATA,
        message: Error.messages.ERR_WRONG_POSTDATA
      })

      return
    }

    const { dates } = postData

    // Üres tömb és nem CSAK sztringeket tartalmazó tömb esetén hibát dobunk.
    if (
      !Validator.isNonEmptyArray<string>(dates) ||
      !dates.every(Validator.isNonEmptyString)
    ) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_POSTDATA,
        message: Error.messages.ERR_WRONG_POSTDATA
      })

      return
    }

    await Promise.resolve()

    ctx.sendOk()
  }
}
