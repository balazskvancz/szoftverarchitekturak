import type { IGeneralError, IBaseDimension } from '../../definitions'

import { EDimensionsRoute } from '../../definitions'

import api from '../api'

/**
 * Egy új dimenzió beszúrása.
 * @param data - A beszúrandó adat.
 */
export default async function insertDimension (data: IBaseDimension): Promise<IGeneralError | null> {
  const { error } = await api.post(EDimensionsRoute.Insert, data)

  return error
}
