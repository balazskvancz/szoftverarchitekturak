import { ECustomerAddressesRoute } from '../../definitions'

import type { TAddresses, IGetAllAddresses } from '../../definitions'

import api from '../api'

/** Az összes, az éppen bejelentkezett felhasználóhoz tartozó cím lekérdezése. */
export default async function getAddresses (): Promise<TAddresses> {
  const { data, error } = await api.get<IGetAllAddresses>(ECustomerAddressesRoute.Get)

  if (error) {
    return []
  }

  return data.addresses
}
