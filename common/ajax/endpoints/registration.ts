import { ECustomersRoute } from '../../definitions'

import type { IGeneralError, IInsertCourier } from '../../definitions'

import api from '../api'

/**
 * Regisztrálás végpont.
 * @param data - Adat.
 */
export default async function registration (
  data: IInsertCourier
): Promise<IGeneralError | null> {
  const { error } = await api.post(ECustomersRoute.Insert, data)

  return error
}
