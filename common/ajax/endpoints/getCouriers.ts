import { ECourierRoute } from '../../definitions'

import type {
  TCouriers,
  IGetAllCouriersResponse
} from '../../definitions'

import api from '../api'

/** Futárok lekérdezése szervertől. */
export default async function getCouriers (): Promise<TCouriers> {
  const { error, data } = await api.get<IGetAllCouriersResponse>(ECourierRoute.Get)

  if (error) {
    return []
  }

  return data.couriers
}
