import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'
import createPassword from '@common/utils/createHash'

import Error from '@userService/Error'

import type { ILogin, IGetUserResponse } from '@userService/definitions'

import type { IService }  from '@userService/getServices'

/**
 * Egy felhasználó lekérdezése e-mail és jelszó alapján.
 * @param services - Services.
 */
export default function getByEmailAndPassword (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const loginData = ctx.getBody<ILogin>()

    if (!Validator.isDefined(loginData)) {
      ctx.sendError({
        code: Error.codes.ERR_MISSING_BODY,
        message: Error.messages.ERR_MISSING_BODY
      })

      return
    }

    if (!Validator.isNonEmptyString(loginData.email)) {
      ctx.sendError({
        code: Error.codes.ERR_MISSING_KEY,
        message: 'Hiányzó email'
      })

      return
    }

    if (!Validator.isNonEmptyString(loginData.password)) {
      ctx.sendError({
        code: Error.codes.ERR_MISSING_KEY,
        message: 'Hiányzó jelszó'
      })

      return
    }

    const user = await services.users.getUserByEmailAndPass(loginData.email, createPassword(loginData.password))

    if (Validator.isNull(user)) {
      ctx.sendError({
        code: Error.codes.ERR_USER_NOT_EXISTS,
        message: Error.messages.ERR_USER_NOT_EXISTS
      })

      return
    }

    const data: IGetUserResponse = {
      user
    }

    ctx.sendJson(data)
  }
}
