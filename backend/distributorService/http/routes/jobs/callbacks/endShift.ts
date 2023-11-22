// Lehet, hogy okafogyott...
//
import type {
  IContext,
  TCallbackFunction
} from '@common/Router/definitions'

import { getDate } from '@common/utils/dateAndTime'

import Validator from '@common/Validator/Validator'

import Error from '@backend/distributorService/Error'

import type {
  IUser
} from '@distributorService/definitions'

import { EBindValue } from '@distributorService/definitions'

import type { IService } from '@backend/distributorService/getServices'

/**
 * Egy adott munkanap végét jelző végpont.
 * @param services - Services.
 */
export default function endShift (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const user = ctx.getBindedValue<IUser>(EBindValue.User)

    if (!Validator.isDefined(user)) {
      ctx.sendError({
        code: Error.codes.ERR_USER_NOT_AUTHENTICATED,
        message: Error.messages.ERR_USER_NOT_AUTHENTICATED
      })

      return
    }

    const today = getDate(Date.now())

    const notFinishedJobs = await services.packageDistributions.getAllNotFinished(user.id, today)

    // Nincs mivel foglalkozunk, megvagyunk.
    if (!Validator.isNonEmptyArray(notFinishedJobs)) {
      ctx.sendOk()

      return
    }

    ctx.sendOk()
  }
}
