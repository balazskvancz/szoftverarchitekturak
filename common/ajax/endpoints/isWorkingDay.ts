import { ECourierRoute } from '../../definitions'

import api from '../api'

/** Megmondja az éppen bejelentkezett felhasználóról, hogy a mindenkori mai napon dolgozik-e. */
export default async function isWorkingDay (): Promise<boolean> {
  const { error } = await api.get(ECourierRoute.IsWorkingDay)

  return !error
}
