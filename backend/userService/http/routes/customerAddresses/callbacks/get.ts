import type {
  IContext,
  TCallbackFunction
} from '@common/Router/definitions'

import Communicator from '@backend/Communicator/Communicator'

import Validator from '@common/Validator/Validator'

import type { IService } from '@backend/userService/getServices'

import Error from '@backend/userService/Error'

import { EBindValue } from '@userService/definitions'
import type { IUser, IGetAllAddresses } from '@userService/definitions'

/**
 * Az összes, az éppen bejelentkezett felhasználóhoz tartozó
 * összes felvett cím lekérdezése.
 * @param services - Services.
 */
export default function get (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const user = ctx.getBindedValue<IUser>(EBindValue.User)

    if (!Validator.isDefined(user)) {
      ctx.sendError({
        code: Error.codes.ERR_USER_NOT_AUTHENTICATED,
        message: Error.messages.ERR_USER_NOT_AUTHENTICATED
      })

      return
    }

    const attachedAddresses = await services.customerAddresses.getByUser(user.id)

    if (!Validator.isNonEmptyArray(attachedAddresses)) {
      const data: IGetAllAddresses = {
        addresses: []
      }

      ctx.sendJson(data)

      return
    }

    const addressIds = attachedAddresses.map(({ addressId }) => addressId)

    const addresses = await Communicator.getAddresses(addressIds)

    const data: IGetAllAddresses = {
      addresses
    }

    ctx.sendJson(data)
  }
}
