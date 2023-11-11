import { ECourierRoute } from '../../definitions'

import type { IGeneralError, IInsertCourier } from '../../definitions'

import api from '../api'

/**
 * Egy új futár beszúrása.
 * @param data - Beszúrandó adat.
 */
export default async function insertCourier (data: IInsertCourier): Promise<IGeneralError | null> {
  const { error } = await api.post(ECourierRoute.Insert, data)

  return error
}
