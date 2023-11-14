import type {
  IContext,
  TCallbackFunction
} from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import Communicator from '@backend/Communicator/Communicator'

import Error from '@backend/userService/Error'

import type { IService } from '@userService/getServices'

import type { IUser, IInsertAddressRequest } from '@userService/definitions'

import { EBindValue } from '@userService/definitions'

/**
 * Új cím beszúrása egy adott felhasználóhoz.
 * @param services - Services.
 */
export default function insertAddress (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const postData = ctx.getBody<IInsertAddressRequest>()

    if (!Validator.isDefined(postData)) {
      ctx.sendError({
        code: Error.codes.ERR_MISSING_BODY,
        message: Error.messages.ERR_MISSING_BODY
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

    const res = await Communicator.insertAddress({
      ...postData,
      userId: user.id
    })

    // Ekkor tudjuk, hogy hibát kaptunk.
    if (Validator.isNonEmptyObject(res)) {
      ctx.sendError(res)

      return
    }

    // Különben pedig megkaptuk az újonann beszúrt egyed azonosítóját.
    const isInserted = await services.customerAddresses.insert({
      addressId: res,
      userId: user.id
    })

    if (!isInserted) {
      ctx.sendError({
        code: Error.codes.ERR_DB_INSERT,
        message: Error.messages.ERR_DB_INSERT
      })

      return
    }

    ctx.sendOk()
  }
}
