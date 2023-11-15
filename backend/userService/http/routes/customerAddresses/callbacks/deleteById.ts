import type {
  IContext,
  TCallbackFunction
} from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import Error from '@backend/userService/Error'

import { EBindValue } from '@userService/definitions'

import type { IUser } from '@userService/definitions'

import type { IService } from '@userService/getServices'

/**
 * Egy adott felhasználó-cím hozzárendelés törlése.
 * @param services - Services.
 */
export default function deleteById (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const { addressId } = ctx.getRouteParams()

    if (!Validator.isPositiveNumber(addressId)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_PARAM,
        message: Error.messages.ERR_WRONG_PARAM
      })

      return
    }

    const user = ctx.getBindedValue<IUser>(EBindValue.User)

    if (!Validator.isDefined(user)) {
      ctx.sendError({
        code: Error.codes.ERR_USER_NOT_AUTHENTICATED,
        message: Error.messages.ERR_USER_NOT_AUTHENTICATED
      })

      return
    }

    const isDeleted = await services.customerAddresses.deleteConnection({
      addressId,
      userId: user.id
    })

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
