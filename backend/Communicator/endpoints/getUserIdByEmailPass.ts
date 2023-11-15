import { EUsersRoute } from '../../definitions'

import type { IUser } from '../../definitions'

import type { IGetUserByIdResponse } from '../../definitions'

import sendRequest from './utils/sendRequest'

/**
 * Elkér az adott email és passworddal rendelkező felhasználó azonosítóját.
 * @param email     - A keresendő egyed emailje.
 * @param password  - A keresendő egyed jelszava.
 */
export default async function getUserById (
  email: string,
  password: string
): Promise<IUser | null> {
  const requestBody = {
    email,
    password
  }

  const { data, isSuccess } = await sendRequest<IGetUserByIdResponse>('POST', EUsersRoute.GetByEmailAndPassword, requestBody)

  if (!isSuccess) {
    return null
  }

  return data.user
}
