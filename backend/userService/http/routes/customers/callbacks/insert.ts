import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import type { IInsertCustomer } from '@userService/definitions'

import type { IService } from '@userService/getServices'

import Error from '@userService/Error'

import validateInsert from './utils/validateInsert'

/**
 * Egy új felhasználó felvételét megvalósító végpont.
 * @param services - Services.
 */
export default function insert (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const postData = ctx.getBody<IInsertCustomer>()

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

    // Alap felhasználó beszúrása.
    const userId = await services.users.insert({
      ...postData,
      role: 'customer'
    })

    if (!Validator.isPositiveNumber(userId)) {
      ctx.sendError({
        code: Error.codes.ERR_DB_INSERT,
        message: Error.messages.ERR_DB_INSERT
      })

      return
    }

    await services.customers.insert(userId, postData.phoneNum)

    ctx.sendOk()
  }
}
