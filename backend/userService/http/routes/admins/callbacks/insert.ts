import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import createPassword from '@common/utils/createHash'

import type { IInsertUserRequest } from '@userService/definitions'

import Error from '@userService/Error'

import type { IService } from '@userService/getServices'

import validateInsert from '../../utils/validateInsert'

/**
 * Egy új admin beszúrását megvalósító végpont.
 * @param services - Services.
 */
export default function insert (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const postData = ctx.getBody<IInsertUserRequest>()

    if (!Validator.isDefined(postData)) {
      ctx.sendError({
        code: Error.codes.ERR_MISSING_BODY,
        message: Error.messages.ERR_MISSING_BODY
      })

      return
    }

    const formErrors = validateInsert(postData)

    if (Validator.isNonEmptyArray(formErrors)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_POSTDATA,
        formErrors
      })

      return
    }

    const alreadyTaken = await services.users.getByEmailAddress(postData.email)

    if (!Validator.isNull(alreadyTaken)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_POSTDATA,
        formErrors: [
          {
            key: 'email',
            message: 'Az e-mail cím már használatban van!'
          }
        ]
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
