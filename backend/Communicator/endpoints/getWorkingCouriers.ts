import { ECourierRoute } from '../../definitions'

import type {
  TCouriers,
  IGetCurrentlyWorkingCouriersResponse
} from '../../definitions'

import sendRequest from './utils/sendRequest'

/** Lekérdezi és visszaadja az éppen aktív, tehát dolgozó futárokat. */
export default async function getWorkingCouriers (): Promise<TCouriers> {
  const res = await sendRequest<IGetCurrentlyWorkingCouriersResponse>(
    'GET',
    ECourierRoute.GetCurrentlyWorking
  )

  if (!res.isSuccess) {
    return []
  }

  return res.data.couriers
}
