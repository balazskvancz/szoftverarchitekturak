import { EPackagesRoute } from '../../definitions'

import type {
  IGetActionablePackagesResponse
} from '../../definitions'

import sendRequest from './utils/sendRequest'

/** Lekérdezi azon csomagokat amikkel kezdeni kell valamit. */
export default async function getActionablePackages (
): Promise<IGetActionablePackagesResponse | null> {
  const res = await sendRequest<IGetActionablePackagesResponse>('GET', EPackagesRoute.GetActionable)

  if (!res.isSuccess) {
    return null
  }

  return res.data
}
