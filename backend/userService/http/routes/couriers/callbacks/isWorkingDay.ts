import type {
  IContext,
  TCallbackFunction
} from '@common/Router/definitions'

import { getDate } from '@common/utils/dateAndTime'

import Validator from '@common/Validator/Validator'

import Error from '@userService/Error'

import { EBindValue } from '@userService/definitions'

import type { IUser } from '@userService/definitions'

import type { IService } from '@userService/getServices'

/**
 * Megmondja a bejelentkezett futárról, hogy az adott napon dolgozik-e.
 * @param services - Services.
 */
export default function isWorkingDay (services: IService): TCallbackFunction {
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

    const workingDay = await services.courierWorkingDays.getByDateAndCourier(today, user.id)

    // Ha ez null, akkor a mai napon nem dolgozik az illető.
    if (Validator.isNull(workingDay)) {
      ctx.sendError({
        code: Error.codes.ERR_TODAY_IS_NOT_WORK_DAY,
        message: Error.messages.ERR_TODAY_IS_NOT_WORK_DAY
      })

      return
    }

    // Különben pedig egyszerűen jelezzük, hogy „igen”.
    ctx.sendOk()
  }
}
