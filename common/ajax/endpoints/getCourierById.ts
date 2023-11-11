import makeUrl from '@common/utils/makeUrl'

import { ECourierRoute } from '../../definitions'

import type {
  ICourier,
  IGetCourierByIdResponse
} from '../../definitions'

import api from '../api'

/**
 * Egy futár elkérése azonosító szerint.
 * @param id - Azonosító.
 */
export default async function getCourierById (id: number): Promise<ICourier | null> {
  const url = makeUrl(ECourierRoute.GetById, [ id ])

  const { error, data } = await api.get<IGetCourierByIdResponse>(url)

  if (error) {
    return null
  }

  return data.courier
}
