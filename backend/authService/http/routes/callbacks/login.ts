import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'
import { createHash } from '@common/utils/createHash'

import Communicator from '@backend/Communicator/Communicator'

import Error from '@authService/Error'

import type { ILogin } from '@authService/definitions'
import type { IService } from '@authService/getServices'

/**
 * A felhasználó bejelentkeztetese.
 * @param services - Services.
 */
export default function login (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const loginData = ctx.getBody<ILogin>()

    // note: ebbe soha nem megy bele, akkor sem ha postmanbol body none-nal kuldom, mindig van egy ures body: {}
    // [Balázs]: ezt jól észrevetted, pontosan így van, ahogy mondod. A „keretrendszer” megpróbál minden
    // olyan dolgot megfogni, ami miatt egy ilyen jellegű alkalmazás hibás lehet – pl. security risk.
    //
    // Egyedül a TypeScript miatt van szükség erre a checkolásra, mert típus szinten
    // nem tudtam garantáltatni, hogy ténylegesen, minden egyes állapotban – tehát determinisztikusan –
    // ott lesz az adat. Pedig ott van... ez a szépsége TS/JS környezetnek :).
    if (!Validator.isDefined(loginData)) {
      ctx.sendError({
        code: Error.codes.ERR_MISSING_BODY,
        message: Error.messages.ERR_MISSING_BODY
      })

      return
    }

    if (!Validator.isNonEmptyString(loginData.email)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_POSTDATA,
        message: 'Hiányzó email'
      })

      return
    }

    if (!Validator.isNonEmptyString(loginData.pass)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_POSTDATA,
        message: 'Hiányzó jelszó'
      })

      return
    }

    // megkérdezzük a userId-t email+pass alapján a Communicatortól
    const userId = await Communicator.getIdByEmailPass(loginData.email, loginData.pass)

    if (Validator.isNull(userId)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_LOGIN_DATA,
        message: Error.messages.ERR_WRONG_LOGIN_DATA
      })

      return
    }

    const loginHash = createHash(userId)

    const insertSuccess = await services.sessions.insert(loginHash, userId)

    if (!insertSuccess) {
      ctx.sendError({
        code: Error.codes.ERR_DB_INSERT,
        message: Error.messages.ERR_DB_INSERT
      })

      return
    }

    ctx.sendJson({
      loginHash
    })
  }
}
