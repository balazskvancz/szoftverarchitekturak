import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import Error from '@authService/Error'

import type { ILogoutRequest }  from '@authService/definitions'
import type { IService }        from '@authService/getServices'

/**
 * A felhasználó adatainak lekérdezése.
 * @param services - Services.
 */
export default function logout (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const postData = ctx.getBody<ILogoutRequest>()

    if (!Validator.isDefined(postData)) {
      ctx.sendError({
        code: Error.codes.ERR_MISSING_BODY,
        message: 'Hiányzó request body'
      })

      return
    }

    if (!Validator.isNonEmptyString(postData.loginHash)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_POSTDATA,
        message: 'Hiányzó session azonosító'
      })

      return
    }

    await services.sessions.setEndedAt(postData.loginHash)

    ctx.sendOk()
  }
}
