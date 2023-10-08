import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import type { IService } from '../../../../getServices'
import Validator from '@common/Validator/Validator'
import Error from '../../../../Error'

/**
 * Az összes felhasználó lekérdezése.
 * @param services - Services.
 */
export default function deleteCustomer (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const { id } = ctx.getRouteParams()

    if (!Validator.isPositiveNumber(id)) {
      ctx.sendError({
        code: Error.codes.ERR_INVALID_ID,
        message: Error.messages.ERR_INVALID_ID
      })

      return
    }

    const isSuccessfull = await services.usersService.deleteCustomer(id)

    if (!isSuccessfull) {
      ctx.sendError({
        code: Error.codes.ERR_DB_DELETE,
        message: Error.messages.ERR_DB_DELETE
      })
    }

    ctx.sendOk()
  }
}
