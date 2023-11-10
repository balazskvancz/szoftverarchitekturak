import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import type { IService } from '@authService/getServices'

import Validator from '@common/Validator/Validator'

import Communicator from '@backend/Communicator/Communicator'

import Error from '@backend/authService/Error'
import type { IDigestSession } from '@backend/authService/definitions'

/**
 * Hash szerinti lekérdezés.
 * @param services - Services.
 */
export default function getByHash (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const { loginHash } = ctx.getRouteParams()

    // Nem áruljuk el, hogy mi volt a hiba.
    if (!Validator.isNonEmptyString(loginHash)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_PARAM,
        message: Error.messages.ERR_WRONG_PARAM
      })

      return
    }

    const session = await services.sessions.getByHash(loginHash)

    // Ha nincs ilyen egyed, akkor tovább sem megyünk, hiba vissza.
    if (Validator.isNull(session)) {
      return
    }

    // Szükségünk van a felhasználó adataira is.
    const user = await Communicator.getUserById(session.userId)

    const data: IDigestSession = {
      ...session,
      user
    }

    ctx.sendJson(data)
  }
}
