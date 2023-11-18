import { ECourierWorkingDaysRoute } from '../../definitions'

import type {
  TCourierCalendarWeek,
  IGetCourierCalendarResponse
} from '../../definitions'

import api from '../api'

/** Elkéri az éppen bejelentkezett futárhoz tartozó naptárat. */
export default async function getCourierCalendar (): Promise<TCourierCalendarWeek[]> {
  const { error, data } = await api.get<IGetCourierCalendarResponse>(ECourierWorkingDaysRoute.GetCalendar)

  if (error) {
    return []
  }

  return data.calendarWeeks
}
