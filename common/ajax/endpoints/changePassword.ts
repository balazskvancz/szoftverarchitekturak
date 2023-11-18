import { EUsersRoute } from '../../definitions'

import type { IGeneralError, IChangePasswordRequest } from '../../definitions'

import api from '../api'

/**
 * Jelszó megváltoztatás.
 * @param data - Küldendő adat.
 */
export default async function changePassword (data: IChangePasswordRequest): Promise<IGeneralError | null> {
  const { error } = await api.post(EUsersRoute.ChangePassword, data)

  return error
}
