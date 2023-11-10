import type { IGetCustomerByIdResponse } from '@backend/userService/definitions'
import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import Error from '@userService/Error'

import type { IService }  from '@userService/getServices'

/**
 * Egy ügyfél azonosító alapján való lekérdezését megvalósító végpont.
 * @param services - Services.
 */
export default function getById (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const { id } = ctx.getRouteParams()

    if (!Validator.isPositiveNumber(id)) {
      ctx.sendError({
        code: Error.codes.ERR_INVALID_ID,
        message: Error.messages.ERR_INVALID_ID
      })

      return
    }

    const customer = await services.customers.getById(id)

    const data: IGetCustomerByIdResponse = {
      customer
    }

    ctx.sendJson(data)
  }
}
