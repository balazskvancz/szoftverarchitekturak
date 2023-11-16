import type { IGeneralError, IInsertAddressRequest } from '../../definitions'

import { ECustomerAddressesRoute } from '../../definitions'

import api from '../api'

/**
 * Egy új felhasználó cím beszúrása.
 * @param data - Beszúrandó adat.
 */
export default async function insertCustomerAddress (
  data: IInsertAddressRequest
): Promise<IGeneralError | null> {
  const { error } = await api.post(ECustomerAddressesRoute.Insert, data)

  return error
}
