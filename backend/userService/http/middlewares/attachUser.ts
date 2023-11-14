// Ez nagyon hasonlít a közös attachUser middleware-re,
// annyi a különbség, hogy itt lokálisan elérhetőek a felhasználó
// adatai, így csak a bejövő loginHash alapján kell a
// a login-t lekérdezni az authService-től.

import type { IContext, TCallbackFunction, TMiddlewareFunction } from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import Communicator from '@backend/Communicator/Communicator'

import type { IService } from '../../getServices'

import Error from '../../Error'

import {
  EBindValue,
  LOGIN_HASH_COOKIE_NAME
} from '../../definitions'

/**
 * Hozzácsatolja a felhasználót a bejövő kéréshez.
 * @param services - Services.
 */
export default function attachUser (
  services: IService
): TMiddlewareFunction {
  return async (ctx: IContext, next: TCallbackFunction): Promise<void> => {
    const loginHash = ctx.getCookie(LOGIN_HASH_COOKIE_NAME)

    if (!Validator.isNonEmptyString(loginHash)) {
      ctx.sendError({
        code: Error.codes.ERR_USER_NOT_AUTHENTICATED,
        message: Error.messages.ERR_USER_NOT_AUTHENTICATED
      })

      return
    }

    const loginEntity = await Communicator.getSession(loginHash)

    if (Validator.isNull(loginEntity)) {
      ctx.sendError({
        code: Error.codes.ERR_USER_NOT_AUTHENTICATED,
        message: Error.messages.ERR_USER_NOT_AUTHENTICATED
      })

      return
    }

    const { userId } = loginEntity

    const user = await services.users.getById(userId)

    if (Validator.isNull(user)) {
      return
    }

    ctx.bindValue(EBindValue.User, user)

    await next(ctx)
  }
}
