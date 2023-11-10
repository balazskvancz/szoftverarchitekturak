import { EUsersRoute } from '../../definitions'

import type { IUser } from '../../definitions'

import type { IGetUserIdByEmailPassResponse } from '../../definitions'

import sendRequest from './utils/sendRequest'

/**
 * Elkér az adott email és passworddal rendelkező felhasználó azonosítóját.
 * @param email - A keresendő egyed emailje.
 * @param pass - A keresendő egyed jelszava.
 */
export default async function getUserById (email: string, pass: string): Promise<IUser | null> {
  const requestBody = {
    email,
    pass
  }

  const { data, isSuccess } = await sendRequest<IGetUserIdByEmailPassResponse>('POST', EUsersRoute.GetByEmailAndPassword, requestBody)

  if (!isSuccess) {
    return null
  }

  return data.userId
}
