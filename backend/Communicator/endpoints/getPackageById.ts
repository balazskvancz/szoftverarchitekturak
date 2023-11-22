import makeUrl from '@common/utils/makeUrl'

import { EPackagesRoute } from '../../definitions'

import type {
  IDigestPackage,
  IGetPackageByIdResponse
} from '../../definitions'

import sendRequest from './utils/sendRequest'

/**
 * Elkér egy csomagot azonosító szerint.
 * @param packageId - Csomag azonosítója.
 */
export default async function getPackageById (
  packageId: number
): Promise<IDigestPackage | null> {
  const url = makeUrl(EPackagesRoute.GetById, [ packageId ])

  const res = await sendRequest<IGetPackageByIdResponse>('GET', url)

  if (!res.isSuccess) {
    return null
  }

  return res.data.digestPackage
}
