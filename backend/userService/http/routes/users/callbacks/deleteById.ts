import type {
  IContext,
  TCallbackFunction
} from '@common/Router/definitions'

import Error      from '@backend/userService/Error'
import Validator  from '@common/Validator/Validator'

import type { IService } from '@backend/userService/getServices'

/**
 * Egy felhasználó törlése végpont.
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

    const isDeleted = await services.users.deleteById(id)

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
