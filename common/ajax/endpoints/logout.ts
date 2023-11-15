import { EAuthRoute } from '../../definitions'

import type { IGeneralError, ILogoutRequest } from '../../definitions'

import api from '../api'

/**
 * Kijelentkezést megvalósító végpont.
 * @param loginHash - A loginHash.
 */
export default async function logout (
  loginHash: string
): Promise<IGeneralError | null> {
  const data: ILogoutRequest = {
    loginHash
  }

  const { error } = await api.post(EAuthRoute.Logout, data)

  return error
}
