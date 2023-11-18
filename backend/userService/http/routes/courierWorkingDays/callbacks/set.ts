import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import Error from '@userService/Error'

import type { IService } from '@userService/getServices'

import { EBindValue } from '@userService/definitions'

import type {
  IUser,
  IBaseCourierWorkingDay,
  ISetWorkingDaysRequest
} from '@userService/definitions'

/**
 * Beállítja az éppen bejelentkezett futárhoz tartozó adott havi naptárat.
 * @param services - Services.
 */
export default function set (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const postData = ctx.getBody<ISetWorkingDaysRequest>()

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

    // Ha strukturálisan rendben is van az adat,
    // attól függetlenül ki kell szűrnünk az olyan dátumokat
    // amelyek a mai napnál korrábbiak.
    const currentTime = new Date().getTime()

    const filteredDates = dates.filter((d) => {
      const date = new Date(d)

      return date.getTime() > currentTime
    })

    if (!Validator.isNonEmptyArray<string>(filteredDates)) {
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

    // Csak futárok!
    if (user.role !== 'customer') {
      ctx.sendError({
        code: Error.codes.ERR_MISSING_PERMISSON,
        message: Error.messages.ERR_MISSING_PERMISSON
      })

      return
    }

    const year  = new Date().getFullYear()
    const month = new Date().getMonth() + 1 // Trükkös, de sajnos ilyen! :)

    // Ebben a tömbben fogjuk tárolni, hogy JELENLEG melyik napokhoz van hozzárendelve.
    // De a bejövő tömböt úgy kell feldolgoznunk, hogy meghatározzuk ezek közül,
    // hogy melyeket kell törölni és melyeket kell beszúrni.
    // Értelemszerűen lesznek olyan napok is, amelyekkel egyáltalán nem kell
    // semmit tennünk, ezeket békén fogjuk hagyni.
    const alreadySetWorkingDays = await services.courierWorkingDays.getByUserId(user.id, `${ year }-${ month }`)

    // Az összes olyan egyed azonosítója kell, amely korábban fel volt véve,
    // de az új tömbben nincs benne.
    const needToDelete = alreadySetWorkingDays.reduce((acc, curr) => {
      const included = filteredDates.find((e) => e === curr.day)

      if (!Validator.isDefined(included)) {
        acc.push(curr.id)
      }

      return acc
    }, [] as number[])

    // A beszúráshoz pedig az összes olyan dátumra szükség van,
    // amely a jelenlegi halmazban még nincs benne.
    const needToInsert: IBaseCourierWorkingDay[] = filteredDates.reduce((acc, curr) => {
      const alreadyincluded = alreadySetWorkingDays.find(({ day }) => day === curr)

      if (!Validator.isDefined(alreadyincluded)) {
        acc.push({
          day: curr,
          userId: user.id
        })
      }

      return acc
    }, [] as IBaseCourierWorkingDay[])

    // Utolsó figyelmeztetés: tömeges adatbázis műveletek
    // elvégzése előtt is fontos, hogy validáljunk.
    // Mivel nem a DB réteg dolga, a kapott paraméterek validálása,
    // ezért itt tesszük ezt meg.
    await Promise.all([
      Validator.isNonEmptyArray(needToDelete)
        ? services.courierWorkingDays.massDelete(needToDelete)
        : null,

      Validator.isNonEmptyArray(needToInsert)
        ? services.courierWorkingDays.massInsert(needToInsert)
        : null
    ])

    ctx.sendOk()
  }
}
