import { EJobsRoute } from '../../definitions'

import type {
  ICurrentJob,
  IGetCurrentJobResponse
} from '../../definitions'

import api from '../api'

/** Lekérdezi az éppen bejelentkezett felhasználó tartozó jelenlegi feladatot. */
export default async function getCurrentJob (): Promise<ICurrentJob | null> {
  const { data, error } = await api.get<IGetCurrentJobResponse>(EJobsRoute.GetCurrent)

  if (error) {
    return null
  }

  return data.currentJob
}
