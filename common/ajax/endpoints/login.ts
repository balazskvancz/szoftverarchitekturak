import { EAuthRoute } from '../../definitions'

import type {
  ILogin,
  ILoginResponse
} from '../../definitions'

import api from '../api'

/**
 * Bejelentkezést megvalósító végpont.
 * @param data - Login.
 */
export default async function login (
  data: ILogin
): Promise<string | null> {
  const { data: resData, error } = await api.post<ILoginResponse>(EAuthRoute.Login, data)

  if (error) {
    return null
  }

  return resData.loginHash
}
