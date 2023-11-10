import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import type { IInsertCourier } from '@userService/definitions'

import type { IService } from '@userService/getServices'

import Error from '@userService/Error'

import validateInsert from './utils/validateInsert'

/**
 * Egy új futár felvételét megvalósító végpont.
 * @param services - Services.
 */
export default function insert (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const postData = ctx.getBody<IInsertCourier>()

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

    // Alap felhasználó beszúrása.
    const userId = await services.users.insert({
      ...postData,
      role: 'courier'
    })

    if (!Validator.isPositiveNumber(userId)) {
      ctx.sendError({
        code: Error.codes.ERR_DB_INSERT,
        message: Error.messages.ERR_DB_INSERT
      })

      return
    }

    // Futár specifikus adatok beszúrása.
    // Itt csak egyszerűen megvárjuk, hogy be legyen szúrva és kész.
    await services.couriers.insert(userId, postData.phoneNum)

    ctx.sendOk()
  }
}
