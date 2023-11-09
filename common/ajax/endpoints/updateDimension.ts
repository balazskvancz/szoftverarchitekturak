import makeUrl from '@common/utils/makeUrl'

import type { IGeneralError, IBaseDimension } from '../../definitions'

import { EDimensionsRoute } from '../../definitions'

import api from '../api'

/**
 * Egy adott dimenzió módosítása.
 * @param id    - Az egyed azonosítója.
 * @param data  - A módosítandó adat.
 */
export default async function updateDimension (
  id: number,
  data: IBaseDimension
): Promise<IGeneralError | null> {
  const url = makeUrl(EDimensionsRoute.Update, [ id ])

  const { error } = await api.put(url, data)

  return error
}
