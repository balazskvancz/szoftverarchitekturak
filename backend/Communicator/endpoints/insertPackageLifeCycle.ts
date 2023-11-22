import { EPackageLifeCyclesRoute } from '../../definitions'

import type {
  IGeneralError,
  IInsertPackageLifeCycleRequest
} from '../../definitions'

import sendRequest from './utils/sendRequest'

/**
 * Egy új csomagéletciklus esemény beszúrása.
 * @param data - Küldendő adat.
 */
export default async function insertPackageLifeCycle (
  data: IInsertPackageLifeCycleRequest
): Promise<IGeneralError | null> {
  const res = await sendRequest('POST', EPackageLifeCyclesRoute.Insert, data, false)

  if (!res.isSuccess) {
    return res.data as IGeneralError
  }

  return null
}
