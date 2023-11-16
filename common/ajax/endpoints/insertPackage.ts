import { EPackagesRoute } from '../../definitions'

import type { IGeneralError, IInsertPackageRequest } from '../../definitions'

import api from '../api'

/**
 * Egy új csomag „feladása”.
 * @param data - Küldendő adat.
 */
export default async function insertPackage (
  data: IInsertPackageRequest
): Promise<IGeneralError | null> {
  const { error } = await api.post(EPackagesRoute.Insert, data)

  return error
}
