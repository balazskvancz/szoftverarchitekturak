import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import type { IService } from '../../../../getServices'
import Validator from '@common/Validator/Validator'
import Error from '../../../../Error'
import { EUserRole } from '../../../../definitions'

/**
 * Egy ügyfél azonosító alapján való lekérdezését megvalósító végpont.
 * @param services - Services.
 */
export default function getCustomer (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const { id } = ctx.getRouteParams()

    if (!Validator.isPositiveNumber(id)) {
      ctx.sendError({
        code: Error.codes.ERR_INVALID_ID,
        message: Error.messages.ERR_INVALID_ID
      })

      return
    }

    const user = await services.usersService.getUser(id, EUserRole.Customer)

    ctx.sendJson({
      user
    })
  }
}
