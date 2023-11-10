import type {
  IContext,
  TCallbackFunction
} from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import Error from '@backend/packageService/Error'

import type { IService } from '@packageService/getServices'

/**
 * Egy adott dimenzió törlése.
 * @param services - Services.
 */
export default function deleteById (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const { id } = ctx.getRouteParams()

    if (!Validator.isPositiveNumber(id)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_PARAM,
        message: Error.messages.ERR_WRONG_PARAM
      })

      return
    }

    const isDeleted = await services.dimensions.deleteById(id)

    if (!isDeleted) {
      ctx.sendError({
        code: Error.codes.ERR_DB_DELETE,
        message: Error.messages.ERR_DB_DELETE
      })

      return
    }

    ctx.sendOk()
  }
}
