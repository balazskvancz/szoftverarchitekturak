import type {
  IContext,
  TCallbackFunction
} from '@common/Router/definitions'

import times from '@common/utils/times'

import Validator from '@common/Validator/Validator'

import Error from '@userService/Error'

import type { IService } from '@backend/userService/getServices'

import { EBindValue } from '@userService/definitions'
import type {
  IUser,
  TCourierCalendarWeek,
  IGetCourierCalendarResponse
} from '@userService/definitions'

import getFirstDayOfMonth from './utils/getFirstDayOfMonth'

const NUMBER_OF_DAYS_IN_WEEK  = 7
const FIRST_TWO_DIGIT_NUMBER  = 10

/**
 * Visszadja az éppen bejelentkezett futárhoz tartozó adott havi naptárat.
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

    const year  = new Date().getFullYear()
    const month = new Date().getMonth() + 1

    const workingDays = await services.courierWorkingDays.getByUserId(user.id, `${ year }-${ month }`)

    // Megmondja, hány darab nap van az éppen keresendő hónapban.
    const daysInQueryMonth = new Date(year, month, 0).getDate()

    // Megmondja, melyik nappal fog kezdődni az adott hónap.
    const firstDayInMonth = getFirstDayOfMonth(year, month - 1)

    // Ekkor már csak össze kell zongorázni ezeket.

    // Mivel, lehet, hogy a hónap kezdete nem hétfőre esik, ezért
    // annyival el kell tolni, az első napot így, összesen,
    // annyi napot kell felvennünk, ahány nap van az adott hónapban
    // plusz, ahány nappal kell elcsúsztatni a kezdést.
    const allDays = daysInQueryMonth + firstDayInMonth

    // Hány hét lesz?
    const numberOfWeeks = Math.ceil(allDays / NUMBER_OF_DAYS_IN_WEEK)

    const calendarWeeks: TCourierCalendarWeek[] = []

    // Végigmegyünk ahány hét van.
    times(numberOfWeeks, (weekIndex: number) => {
      const currentWeek: TMutable<TCourierCalendarWeek> = []

      // Végigmegyünk az összes napon is.
      times(NUMBER_OF_DAYS_IN_WEEK, (dayIndex: number) => {
        // const day: = { date: '', type: EDayType.Day }
        // Ezzel az egyszerű magic képlettel meghatározzuk, hogy az éppen
        // az iterációban tartó napnak milyen "dátuma", azaz textje lesz.
        // Kell a + 1 a végére, mert a times [0..n-1] között iterál.
        const dayNumber = ((weekIndex * NUMBER_OF_DAYS_IN_WEEK) + dayIndex - firstDayInMonth + 1)

      // Ha nincs száma, vagy már túlmentünk
      // az összes napok számán, akkor ez egy üres nap.
        if (dayNumber <= 0 || dayNumber > daysInQueryMonth) {
          currentWeek.push({
            date: '',
            isSetForWorking: false
          })

          return
        }

        const dayStr = dayNumber < FIRST_TWO_DIGIT_NUMBER ? `0${ dayNumber }` : `${ dayNumber }`

        const currentFullDate = `${ year }-${ month }-${ dayStr }`

        const isSetForWorking = workingDays.find((e) => e.day === currentFullDate)

        currentWeek.push({
          date: currentFullDate,
          isSetForWorking: Validator.isDefined(isSetForWorking)
        })
      })

      // A jelenlegi hetet hozzáadjuk.
      calendarWeeks.push(currentWeek)
    })

    const data: IGetCourierCalendarResponse = {
      calendarWeeks
    }

    ctx.sendJson(data)
  }
}
