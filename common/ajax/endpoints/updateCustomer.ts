import makeUrl from '@common/utils/makeUrl'

import { ECustomersRoute } from '../../definitions'

import type {
  IGeneralError,
  IBaseCustomer
} from '../../definitions'

import api from '../api'

/**
 * Egy adott felhasználó adatainak módosítása.
 * @param id    - Azonosító.
 * @param data  - Módosítandó adat.
 */
export default async function updateCustomer (
  id: number,
  data: IBaseCustomer
): Promise<IGeneralError | null> {
  const url = makeUrl(ECustomersRoute.Update, [ id ])

  const { error } = await api.put(url, data)

  return error
}
