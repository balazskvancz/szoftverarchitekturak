import makeUrl from '@common/utils/makeUrl'

import { ECustomersRoute } from '../../definitions'

import type { ICustomer, IGetCustomerByIdResponse } from '../../definitions'

import api from '../api'

/**
 * Egy adott felhasználó elkérése azonosító szerint.
 * @param id - Azonosító.
 */
export default async function getCustomerById (id: number): Promise<ICustomer | null> {
  const url = makeUrl(ECustomersRoute.GetById, [ id ])

  const { data, error } = await api.get<IGetCustomerByIdResponse>(url)

  if (error) {
    return null
  }

  return data.customer
}
