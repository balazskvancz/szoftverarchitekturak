import { EUsersRoute } from '../../definitions'

import type { IGetUserIdByEmailPassResponse } from '../../definitions'

import sendRequest from './utils/sendRequest'

/**
 * Elkér az adott email és passworddal rendelkező felhasználó azonosítóját.
 * Elkér az adott email és passworddal rendelkező felhasználó azonosítóját.
 * @param email - A keresendő egyed emailje.
 * @param pass - A keresendő egyed jelszava.
 */
export default async function getUserById (email: string, pass: string): Promise<number | null> {
  const url = EUsersRoute.GetIdByEmailPass
  const url = EUsersRoute.GetIdByEmailPass

  const requestBody = {
    email,
    pass
  }

  }

  const jsonString = JSON.stringify(requestBody)

  console.log('-- communicator sent request')

  const { data, isSuccess } = await sendRequest<IGetUserIdByEmailPassResponse>('POST', url, requestBody)


  console.log('-- communicator get response')

  if (!isSuccess) {
    console.log('megvagy szaros')

    return null
  }

  return data.userId
}
