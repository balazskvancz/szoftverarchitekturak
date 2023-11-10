import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import createPassword from '@common/utils/createHash'

import Validator from '@common/Validator/Validator'

import Communicator from '@backend/Communicator/Communicator'

import Error from '@authService/Error'

import type { ILogin, ILoginResponse } from '@authService/definitions'
import type { IService } from '@authService/getServices'

/**
 * A felhasználó bejelentkeztetese.
 * @param services - Services.
 */
export default function login (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const postData = ctx.getBody<ILogin>()

    if (!Validator.isDefined(postData)) {
      ctx.sendError({
        code: Error.codes.ERR_MISSING_BODY,
        message: Error.messages.ERR_MISSING_BODY
      })

      return
    }

    // Átszólunk a userService-nek, ami megmondja, hogy létezik-e ilyen felhasználó.
    const user = await Communicator.getIdByEmailPass(postData.email, postData.password)

    if (Validator.isNull(user)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_LOGIN_DATA,
        message: Error.messages.ERR_WRONG_LOGIN_DATA
      })

      return
    }

    const loginHash = createPassword(`${ user.id }-${ new Date().getTime() }`)

    const isInserted = await services.sessions.insert({
      loginHash,
      userId: user.id
    })

    if (!isInserted) {
      ctx.sendError({
        code: Error.codes.ERR_DB_INSERT,
        message: Error.messages.ERR_DB_INSERT
      })

      return
    }

    const data: ILoginResponse = {
      loginHash
    }

    ctx.sendJson(data)
  }
}
