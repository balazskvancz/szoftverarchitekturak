import type {
  IContext,
  TCallbackFunction
} from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import Error from '@backend/distributorService/Error'

import type { IService } from '@backend/distributorService/getServices'

import { EBindValue } from '@backend/distributorService/definitions'

import type { IUser, IGetNextJobResponse } from '@backend/distributorService/definitions'

/**
 * A következő feladat visszaadása az éppen bejelentkezett felhasználó számára.
 * @param services - Services.
 * @returns
 */
export default function getNexJob (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const user = ctx.getBindedValue<IUser>(EBindValue.User)

    if (!Validator.isDefined(user)) {
      ctx.sendError({
        code: Error.codes.ERR_USER_NOT_AUTHENTICATED,
        message: Error.messages.ERR_USER_NOT_AUTHENTICATED
      })

      return
    }

    const nextJob = await services.packageDistributions.getNextByCourier(user.id)

    const data: IGetNextJobResponse = {
      nextJob
    }

    ctx.sendJson(data)
  }
}
