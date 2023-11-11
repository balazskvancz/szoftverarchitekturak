import makeUrl from '@common/utils/makeUrl'

import { EAdminsRoute } from '../../definitions'

import type {
  IAdmin,
  IGetAdminByIdResponse
} from '../../definitions'

import api from '../api'

/**
 * Egy admin elkérése azonosító szerint.
 * @param id - A keresendő egyed azonosítója.
 */
export default async function getAdminById (
  id: number
): Promise<IAdmin | null> {
  const url = makeUrl(EAdminsRoute.GetById, [ id ])

  const { error, data } = await api.get<IGetAdminByIdResponse>(url)

  if (error) {
    return null
  }

  return data.admin
}
