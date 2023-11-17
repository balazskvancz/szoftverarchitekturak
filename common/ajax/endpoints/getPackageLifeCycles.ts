import makeUrl from '@common/utils/makeUrl'

import { EPackagesRoute } from '../../definitions'

import type { TPackageLifeCycles, IGetPackageLifeCyclesResponse } from '../../definitions'

import api from '../api'

/**
 * Egy adott csomaghoz tartozó összes élteciklus esemény lekérdezése.
 * @param packageId - Csomag azonosító.
 */
export default async function getPackageLifeCycles (packageId: number): Promise<TPackageLifeCycles> {
  const url = makeUrl(EPackagesRoute.GetLifeCycles, [ packageId ])

  const { data, error } = await api.get<IGetPackageLifeCyclesResponse>(url)

  if (error) {
    return []
  }

  return data.lifeCycles
}
