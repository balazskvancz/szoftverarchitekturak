import makeUrl from '@common/utils/makeUrl'

import { EJobsRoute } from '../../definitions'

import type { IGeneralError, ISetJobDoneRequest } from '../../definitions'

import api from '../api'

/**
 * Egy adott feladat elvégzetté tétele.
 * @param id    - Feladat azonosító.
 * @param data  - Küldendő adat.
 */
export default async function setJobDone (
  id: number,
  data: ISetJobDoneRequest
): Promise<IGeneralError | null> {
  const url = makeUrl(EJobsRoute.SetJobDone, [ id ])

  const { error } = await api.post(url, data)

  return error
}
