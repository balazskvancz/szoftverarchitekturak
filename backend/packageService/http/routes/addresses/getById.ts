import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import Error from '@packageService/Error'

import type { IService }                from '@packageService/getServices'
import type { IGetAddressByIdResponse } from '@packageService/definitions'

/**
 * Egy adott azonosítóval rendelkező cím lekérését megvalósító végpont.
 * @param services - Services.
 */
export default function getById (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const { id } = ctx.getRouteParams()

    if (!Validator.isPositiveNumber(id)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_PARAM,
        message: Error.messages.ERR_WRONG_PARAM
      })

      return
    }

    const address = await services.addresses.getById(id)

    const data: IGetAddressByIdResponse = {
      address
    }

    ctx.sendJson(data)
  }
}
