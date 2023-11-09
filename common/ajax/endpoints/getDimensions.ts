import { EDimensionsRoute } from '../../definitions'
import type {
  TDimensions,
  IGetAllDimensionsResponse
} from '../../definitions'

import api from '../api'

/** Az összes dimenziót lekérdező végpont. */
export default async function getDimensions (): Promise<TDimensions> {
  const { data, error } = await api.get<IGetAllDimensionsResponse>(EDimensionsRoute.GetAll)

  if (error) {
    return []
  }

  return data.dimensions
}
