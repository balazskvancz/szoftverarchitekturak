import { ECustomersRoute } from '../../definitions'

import type { TCustomers, IGetAllCustomersResponse } from '../../definitions'

import api from '../api'

/** Felhasználók lekérdezése a szervertől. */
export default async function getCustomers (): Promise<TCustomers> {
  const { error, data } = await api.get<IGetAllCustomersResponse>(ECustomersRoute.Get)

  if (error) {
    return []
  }

  return data.customers
}
