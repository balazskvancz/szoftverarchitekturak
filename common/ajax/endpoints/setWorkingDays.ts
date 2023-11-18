import { ECourierWorkingDaysRoute } from '../../definitions'

import type { IGeneralError, ISetWorkingDaysRequest } from '../../definitions'

import api from '../api'

/**
 * Beállítja a naptárat.
 * @param data - Adat.
 */
export default async function setWorkingDays (data: ISetWorkingDaysRequest): Promise<IGeneralError | null> {
  const { error } = await api.post(ECourierWorkingDaysRoute.Set, data)

  return error
}
