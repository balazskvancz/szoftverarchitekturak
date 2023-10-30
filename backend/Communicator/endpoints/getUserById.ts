import makeUrl from '@common/utils/makeUrl'

import { EUsersRoute } from '../../definitions'
import type { IUser, IGetUserByIdResponse } from '../../definitions'

import sendRequest from './utils/sendRequest'

/**
 * Elkér egy adott felhasználót annak azonosítója alapján.
 * @param userId - A keresendő egyed azonosítója.
 */
export default async function getUserById (userId: number): Promise<IUser | null> {
  const url = makeUrl(EUsersRoute.GetUserById, [ userId ])
  console.log(url)
  const { data, isSuccess } = await sendRequest<IGetUserByIdResponse>('GET', url)

  if (!isSuccess) {
    return null
  }

  return data.user
}
