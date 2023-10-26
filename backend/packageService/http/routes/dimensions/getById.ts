import type {
  IContext,
  TCallbackFunction
} from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import Error from '../.../../../../Error'

import type { IGetDimensionByIdResponse } from '@packageService/definitions'

import type { IService } from '@packageService/getServices'

/**
 * Egy felvett dimenzió lekérdezését megvalósító végpont.
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

    const dimension = await services.dimensions.getById(id)

    const data: IGetDimensionByIdResponse = {
      dimension
    }

    ctx.sendJson(data)
  }
}
