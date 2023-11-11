import type { TAdmins,  IGetAllAdminsResponse } from '../../definitions'

import { EAdminsRoute } from '../../definitions'

import api from '../api'

/** Adminokat lekérdező végpont. */
export default async function getAdmins (): Promise<TAdmins> {
  const { data, error } = await api.get<IGetAllAdminsResponse>(EAdminsRoute.Get)

  if (error) {
    return []
  }

  return data.admins
}
