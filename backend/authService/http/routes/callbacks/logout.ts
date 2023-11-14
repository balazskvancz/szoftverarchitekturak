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
        message: Error.messages.ERR_MISSING_BODY
      })

      return
    }

    if (!Validator.isNonEmptyString(postData.loginHash)) {
      ctx.sendError({
        code: Error.codes.ERR_MISSING_LOGIN_HASH,
        message: Error.messages.ERR_MISSING_LOGIN_HASH
      })

      return
    }

    // beállítjuk az endedAt mezőt az adott hash-en
    // ha olyan hash-t kaptunk ami nincs az adatbázisban
    // akkor nem csinálunk semmit.
    await services.sessions.setEndedAt(postData.loginHash)

    ctx.sendOk()
  }
}
