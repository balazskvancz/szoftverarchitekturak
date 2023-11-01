import { EUsersRoute } from '../../definitions'

import type { IGetUserIdByEmailPassResponse } from '../../definitions'

import sendRequest from './utils/sendRequest'

/**
 * Elkér az adott email és passworddal rendelkező felhasználó azonosítóját.
 * @param email - A keresendő egyed emailje.
 * @param pass - A keresendő egyed jelszava.
 */
export default async function getUserById (email: string, pass: string): Promise<number | null> {
  const url = EUsersRoute.GetIdByEmailPass

  const requestBody = {
    email,
    pass
  }

  const { data, isSuccess } = await sendRequest<IGetUserIdByEmailPassResponse>('POST', url, requestBody)

  if (!isSuccess) {
    return null
  }

  return data.userId
}
