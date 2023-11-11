import makeUrl from '@common/utils/makeUrl'

import { EAdminsRoute } from '../../definitions'

import type { IBaseUser, IGeneralError } from '../../definitions'

import api from '../api'

/**
 * Egy admin módosítása.
 * @param id    - Admin azonosíója.
 * @param data  - Küldendő adat.
 */
export default async function updateAdmin (
  id: number,
  data: IBaseUser
): Promise<IGeneralError | null> {
  const url = makeUrl(EAdminsRoute.Update, [ id ])

  const { error } = await api.put(url, data)

  return error
}
