import makeUrl from '@common/utils/makeUrl'

import { EDimensionsRoute } from '../../definitions'

import type { IDimension, IGetDimensionByIdResponse } from '../../definitions'

import api from '../api'

/**
 * Egy dimenzió lekérdezése azonosító szerint.
 * @param id - A keresett egyed azonosítója.
 */
export default async function getDimensionById (id: number): Promise<IDimension | null> {
  const url = makeUrl(EDimensionsRoute.GetById, [ id ])

  const { error, data } = await api.get<IGetDimensionByIdResponse>(url)

  if (error) {
    return null
  }

  return data.dimension
}
