import { ECustomersRoute } from '../../definitions'

import type {
  IGeneralError,
  IInsertCustomer
} from '../../definitions'

import api from '../api'

/**
 * Egy új felhasználó beszúrása.
 * @param data - Beszúrandó adat.
 */
export default async function insertCustomer (
  data: IInsertCustomer
): Promise<IGeneralError | null> {
  const { error } = await api.post(ECustomersRoute.Insert, data)

  return error
}
