import { EPackagesRoute } from '../../definitions'

import type { TDigestPackages, IGetDigestPackages } from '../../definitions'

import api from '../api'

/** Lekérdezi az összes, a bejelentkezett felhasználóhoz tartozó összes csomagot. */
export default async function getPackagesByUser (): Promise<TDigestPackages> {
  const { data, error } = await api.get<IGetDigestPackages>(EPackagesRoute.Get)

  if (error) {
    return []
  }

  return data.digestPackages
}
