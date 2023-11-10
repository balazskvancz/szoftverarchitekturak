import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import Error from '@userService/Error'

import type { IBaseCourier } from '@userService/definitions'

import type { IService } from '@userService/getServices'

import validateUpdate from './utils/validateUpdate'

/**
 * Egy futár egy adatmezőjének módosítását megvalósító végpont.
 * @param services - Services.
 */
export default function update (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const { id } = ctx.getRouteParams()

    if (!Validator.isPositiveNumber(id)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_PARAM,
        message: Error.messages.ERR_WRONG_PARAM
      })

      return
    }

    const postData = ctx.getBody<IBaseCourier>()

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

    const isUpdated = await services.users.update(id, {
      ...postData
    })

    if (!isUpdated) {
      ctx.sendError({
        code: Error.codes.ERR_DB_UPDATE,
        message: Error.messages.ERR_DB_UPDATE
      })

      return
    }

    await services.couriers.update(id, postData.phoneNum)

    ctx.sendOk()
  }
}
