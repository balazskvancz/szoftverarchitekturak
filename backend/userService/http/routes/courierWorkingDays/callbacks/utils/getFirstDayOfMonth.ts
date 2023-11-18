/**
 * Megmondja, hogy melyik az első nap egy adott hónapban.
 * @param year    - Az adott év.
 * @param month   - Az adott hónap.
 */
export default function getFirstDayOfMonth (year: number, month: number): number {
  const date = new Date(year, month, 1).toString()

  const splittedDate = date.split(' ')

  const days = [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ]
  const [ day ] = splittedDate

  return days.indexOf(day)
}
