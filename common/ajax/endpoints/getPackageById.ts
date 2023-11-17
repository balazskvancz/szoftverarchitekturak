import makeUrl from '@common/utils/makeUrl'

import { EPackagesRoute } from '../../definitions'

import type { IDigestPackage, IGetPackageByIdResponse } from '../../definitions'

import api from '../api'

/**
 * Egy csomag lekérdezése azonosító szerint.
 * @param packageId - Comsag azonosító.
 */
export default async function getPackageById (packageId: number): Promise<IDigestPackage | null> {
  const url = makeUrl(EPackagesRoute.GetById, [ packageId ])

  const { error, data } = await api.get<IGetPackageByIdResponse>(url)

  if (error) {
    return null
  }

  return data.digestPackage
}
