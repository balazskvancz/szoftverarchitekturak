import type { IDateParts, ITimeParts } from './definitions'
import { TEN, HOUR_PER_DAY, MINUTES_PER_HOUR, SECONDS_PER_MINUTE, MILLISECONDS_PER_SECOND } from './definitions'

/**
 * Pad.
 * @param val - A szám.
 */
function pad (val: number): string {
  return val < TEN ? `0${ val }` : val.toString()
}

/** Visszaadja az aktuális időt, számként. */
export function getActTime (): number {
  return Date.now()
}

/**
 * Formázott dátum elkérése.
 * @param param - Dátum.
 * @param parts - A dátum mely részei szerepeljenek a visszaadott string-ben.
 */
export function getDate (
  param?: string | number,
  parts: IDateParts = {
    needYear: true,
    needMonth: true,
    needDay: true
  }): string {
  const date  = new Date(param ?? Date.now())

  const tmp: (number | string)[] = []

  if (parts.needYear) {
    tmp.push(date.getFullYear())
  }

  if (parts.needMonth) {
    tmp.push(pad(date.getMonth() + 1))
  }

  if (parts.needDay) {
    tmp.push(pad(date.getDate()))
  }

  return tmp.join('-')
}

/**
 * Formázott időpont elkérése.
 * @param param - Időpont.
 * @param parts - Az időpont mely részei szerepeljenek a visszaadott string-ben.
 */
export function getTime (
  param?: string | number,
  parts: ITimeParts = {
    needHours: true,
    needMinutes: true,
    needSeconds: true
  }): string {
  const date  = new Date(param ?? Date.now())

  const tmp: string[] = []

  if (parts.needHours) {
    tmp.push(pad(date.getHours()))
  }

  if (parts.needMinutes) {
    tmp.push(pad(date.getMinutes()))
  }

  if (parts.needSeconds) {
    tmp.push(pad(date.getSeconds()))
  }

  return tmp.join(':')
}

/**
 * Visszaadja a teljes dátumot a paramétereknek megfelelően.
 * @param param - Az idő számként vagy stringként, ebből generáljuk a kimenetet.
 */
export function getFullDate (param?: string | number): string {
  const date = getDate(param)
  const time = getTime(param)

  return `${ date } ${ time }`
}

/**
 * Visszaadja, az összes dátumot a kezdő és végdátum között.
 * @param start - Kezdő dátum.
 * @param end - Vég dátu.
 */
export function getDaysBetweenDates (start: string, end: string): string[] {
  const dates: string[] = []

  const currentDate = new Date(start)
  const endDate = new Date(end)

  while (currentDate.getTime() <= endDate.getTime()) {
    dates.push(getDate(currentDate.toDateString()))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return dates
}

/**
 * Visszaadja, hogy két dátum között mennyi nap van.
 * @param start - A kezdődátum.
 * @param end - A végdátum.
 * @param isMinusValid - Lehet negatív szám is?
 */
export function getDaysCountBetweenDates (start: string, end: string, isMinusValid = false): number {
  const date1 = new Date(start)
  const date2 = new Date(end)

  const oneDay = HOUR_PER_DAY * MINUTES_PER_HOUR * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND

  const rawDiff = (date1.getTime() - date2.getTime())
  const diff    = isMinusValid ? rawDiff : Math.abs(rawDiff)

  return Math.round(diff / oneDay)
}

/**
 * Egy adott dátumból kivon/hozzáad egy adott mennyiségű napot.
 * @param date - A dátum amiből ki akarunk vonni.
 * @param operation - Milyen operációt szeretnénk végrehajtani a dátumon.
 * @param dayCount - Azon napok száma, ahány napot szeretnénk kivonni.
 */
export function addSubDays (date: string, operation: string, dayCount: number): number {
  const dateFormat = new Date(date)

  if (operation === '+') {
    dateFormat.setDate(dateFormat.getDate() + dayCount)
  }
  else if (operation === '-') {
    dateFormat.setDate(dateFormat.getDate() - dayCount)
  }

  return dateFormat.getTime()
}

/**
 * Egy adott dátumból kivon/hozzáad egy adott mennyiségű napot.
 * @param date - A dátum amiből ki akarunk vonni.
 * @param operation - Milyen operációt szeretnénk végrehajtani a dátumon.
 * @param dayCount - Azon napok száma, ahány napot szeretnénk kivonni.
 */
export function addSubDaysDate (date: string, operation: string, dayCount: number): string {
  return getDate(addSubDays(date, operation, dayCount))
}

/**
 * Egy adott dátumból kivon/hozzáad egy adott mennyiségű napot.
 * @param date - A dátum amiből ki akarunk vonni.
 * @param operation - Milyen operációt szeretnénk végrehajtani a dátumon.
 * @param dayCount - Azon napok száma, ahány napot szeretnénk kivonni.
 */
export function addSubDaysFullDate (date: string, operation: string, dayCount: number): string {
  return getFullDate(addSubDays(date, operation, dayCount))
}

const LAST_FIVE = -5

/**
 * Kreál egy helyes ISO formátumú dátumot.
 * @param time - Idő.
 * @param offset - Eltolódás.
 */
export function getISODate (time: number, offset?: string): string {
  return `${ new Date(time).toISOString().slice(0, LAST_FIVE) }+${ offset ?? '00:00' }`
}
