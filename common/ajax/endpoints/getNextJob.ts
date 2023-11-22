import { EJobsRoute } from '../../definitions'

import type {
  INextJob,
  IGetNextJobResponse
} from '../../definitions'

import api from '../api'

/** Lekérdezi az éppen bejelentkezett felhasználó következő feladatát. */
export default async function getNextJob (): Promise<INextJob | null> {
  const { data, error } = await api.get<IGetNextJobResponse>(EJobsRoute.GetNextJob)

  if (error) {
    return null
  }

  return data.nextJob
}
