import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import Error from '@userService/Error'

import type { IService } from '@userService/getServices'

import { EBindValue } from '@userService/definitions'
import type { IUser, IBaseCourierWorkingDay, IInsertWorkingDaysRequest } from '@userService/definitions'

/**
 * Egy új futár felvételét megvalósító végpont.
 * @param services - Services.
 */
export default function insert (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const postData = ctx.getBody<IInsertWorkingDaysRequest>()

    if (!Validator.isDefined(postData)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_POSTDATA,
        message: Error.messages.ERR_WRONG_POSTDATA
      })

      return
    }

    const { dates } = postData

    // Üres tömb és nem CSAK sztringeket tartalmazó tömb esetén hibát dobunk.
    if (
      !Validator.isNonEmptyArray<string>(dates) ||
      !dates.every(Validator.isNonEmptyString)
    ) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_POSTDATA,
        message: Error.messages.ERR_WRONG_POSTDATA
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

    const workingDays = await services.courierWorkingDays.getByUserId(user.id)

    const days = workingDays.map(({ day }) => day)

    // Ki kell szűrni, hogy melyek azok a dátumok,
    // amelyek még nincsenek felvéve.
    const insertData = dates.reduce((acc, curr) => {
      const already = days.find((d) => d === curr)

      // Ha még nincs felvéve, akkor most hozzáadjuk.
      if (!Validator.isDefined(already)) {
        acc.push({
          day: curr,
          userId: user.id
        })
      }

      return acc
    }, [] as IBaseCourierWorkingDay[])

    // Ha üres a fent meghatározott tömb, akkor nincs mit csinálni.
    if (!Validator.isNonEmptyArray(insertData)) {
      ctx.sendError({
        code: Error.codes.ERR_NOTHING_TO_INSERT,
        message: Error.messages.ERR_NOTHING_TO_INSERT
      })

      return
    }

    await services.courierWorkingDays.massInsert(insertData)

    ctx.sendOk()
  }
}
