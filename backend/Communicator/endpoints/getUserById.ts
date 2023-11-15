import makeUrl from '@common/utils/makeUrl'

import { EUsersRoute } from '../../definitions'
import type { IUser, IGetUserResponse } from '../../definitions'

import sendRequest from './utils/sendRequest'

/**
 * Elkér egy adott felhasználót annak azonosítója alapján.
 * @param userId - A keresendő egyed azonosítója.
 */
export default async function getUserById (userId: number): Promise<IUser | null> {
  const url = makeUrl(EUsersRoute.GetUserById, [ userId ])

  const { data, isSuccess } = await sendRequest<IGetUserResponse>('GET', url)

  if (!isSuccess) {
    return null
  }

  return data.user
}
