import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import type { IInsertUser } from '../../../../definitions'

import type { IService } from '../../../../getServices'
import Error from '../../../../Error'

/**
 * Egy új felhasználó felvételét megvalósító végpont.
 * @param services - Services.
 */
export default function insert (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const postData = ctx.getBody<IInsertUser>()

    if (!Validator.isDefined(postData)) {
      ctx.sendError({
        code: Error.codes.ERR_MISSING_BODY,
        message: Error.messages.ERR_MISSING_BODY
      })

      return
    }

    if (!Validator.isNonEmptyString(postData.name)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_POSTDATA,
        message: 'Hiányzó név!'
      })

      return
    }

    if (!Validator.isNonEmptyString(postData.email)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_POSTDATA,
        message: 'Hiányzó email!'
      })

      return
    }

    if (!Validator.isNonEmptyString(postData.password)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_POSTDATA,
        message: 'Hiányzó jelszó!'
      })

      return
    }

    const insertedId = await services.usersService.insert(postData)

    if (insertedId <= 0) {
      ctx.sendError({
        code: Error.codes.ERR_DB_INSERT,
        message: Error.messages.ERR_DB_INSERT
      })

      return
    }

    ctx.sendOk()
  }
}
