import type {
  IContext,
  TCallbackFunction
} from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import { EBindValue } from '@userService/definitions'
import type { IUser, IGetCourierWorkingDaysResponse } from '@userService/definitions'

import Error from '@userService/Error'

import { getDate } from '@common/utils/dateAndTime'

import type { IService } from '@backend/userService/getServices'

/**
 * Összes adott futárhoz tartozó nap lekérdezése.
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

    const date = getDate(Date.now())

    const workingDays = await services.courierWorkingDays.getByUserId(user.id, date)

    const data: IGetCourierWorkingDaysResponse = {
      workingDays
    }

    ctx.sendJson(data)
  }
}
