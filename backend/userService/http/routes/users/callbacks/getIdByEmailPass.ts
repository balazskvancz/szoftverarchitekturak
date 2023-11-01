import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import Error from '@userService/Error'

import type { IGetUserByIdResponse, ILogin } from '@userService/definitions'

import type { IService }  from '@userService/getServices'

/**
 * Egy felhasználó lekérdezése id alapján.
 * @param services - Services.
 */
export default function getIdByEmailPass (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const loginData = ctx.getBody<ILogin>()

    console.log('mukk')
    console.log(loginData)
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

    if (!Validator.isNonEmptyString(loginData.pass)) {
      ctx.sendError({
        code: Error.codes.ERR_MISSING_KEY,
        message: 'Hiányzó jelszó'
      })

      return
    }
    // ráhívni a DB-re és elkérni a felhasználót ha van ilyen
    // ha nincs null-t adunk vissza
    const userId = await services.usersService.getUserIdByEmailPass(loginData.email, loginData.pass)

    console.log(userId)

    ctx.sendJson({"userId": 0})
  }
}
