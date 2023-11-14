import type {
  IContext,
  TCallbackFunction
} from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import { EBindValue } from '@backend/userService/definitions'

import type { IUser } from '@backend/userService/definitions'

import Error from '@backend/userService/Error'

import type { IService } from '@backend/userService/getServices'

/**
 * Egy adott korábban vállalt munkanap törlése.
 * @param services - Services.
 */
export default function deleteWorkingDay (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const { date } = ctx.getRouteParams()

    if (!Validator.isNonEmptyString(date)) {
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

    const isDeleted = await services.courierWorkingDays.deleteDay({
      day: date,
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
