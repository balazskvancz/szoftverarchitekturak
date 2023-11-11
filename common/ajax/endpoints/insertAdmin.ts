import { EAdminsRoute } from '../../definitions'

import type { IGeneralError, IInsertUserRequest } from '../../definitions'

import api from '../api'

/**
 * Egy új admin beszúrása végpont.
 * @param data - Küldendő adat.
 */
export default async function insertAdmin (
  data: IInsertUserRequest
): Promise<IGeneralError | null> {
  const { error } = await api.post(EAdminsRoute.Insert, data)

  return error
}
