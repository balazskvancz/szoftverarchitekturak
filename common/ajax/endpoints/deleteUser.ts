import makeUrl from '@common/utils/makeUrl'

import { EUsersRoute } from '../../definitions'

import type { IGeneralError } from '../../definitions'

import api from '../api'

/**
 * Egy adott felhasználó törlése.
 * @param userId - Felhasználó azonosító.
 */
export default async function deleteUser (
  userId: number
): Promise<IGeneralError | null> {
  const url = makeUrl(EUsersRoute.DeleteById, [ userId ])

  const { error } = await api.delete(url)

  return error
}
