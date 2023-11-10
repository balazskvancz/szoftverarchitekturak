import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import type { IInsertUserRequest } from '@userService/definitions'

import Error from '@userService/Error'

import type { IService } from '@userService/getServices'

import validateUpdate from '../../utils/validateUpdate'
import createPassword from '@common/utils/createHash'

/**
 * Egy admin egy adatmezőjének módosítását megvalósító végpont.
 * @param services - Services.
 */
export default function updateAdmin (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const { id } = ctx.getRouteParams()

    if (!Validator.isPositiveNumber(id)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_PARAM,
        message: Error.messages.ERR_WRONG_PARAM
      })

      return
    }

    const postData = ctx.getBody<IInsertUserRequest>()

    if (!Validator.isDefined(postData)) {
      ctx.sendError({
        code: Error.codes.ERR_MISSING_BODY,
        message: Error.messages.ERR_MISSING_BODY
      })

      return
    }

    const formErrors = validateUpdate(postData)

    if (Validator.isNonEmptyArray(formErrors)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_POSTDATA,
        formErrors
      })

      return
    }

    const insertedId = await services.users.insert({
      ...postData,
      password: createPassword(postData.password),
      role: 'admin'
    })

    if (!Validator.isPositiveNumber(insertedId)) {
      ctx.sendError({
        code: Error.codes.ERR_DB_INSERT,
        message: Error.messages.ERR_DB_INSERT
      })

      return
    }

    ctx.sendOk()
  }
}
