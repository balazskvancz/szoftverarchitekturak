import makeUrl from '@common/utils/makeUrl'

import { ECourierRoute } from '../../definitions'

import type {
  IBaseCourier,
  IGeneralError
} from '../../definitions'

import api from '../api'

/**
 * Egy adott futár módosítása.
 * @param id    - Azonosító.
 * @param data  - Módosítandó adat.
 */
export default async function updateCourier (
  id: number,
  data: IBaseCourier
): Promise<IGeneralError | null> {
  const url = makeUrl(ECourierRoute.Update, [ id ])

  const { error } = await api.put(url, data)

  return error
}
