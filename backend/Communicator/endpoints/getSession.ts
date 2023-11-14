import makeUrl from '@common/utils/makeUrl'

import { EAuthRoute } from '../../definitions'

import type { ISession, IGetSessionByHashResponse } from '../../definitions'

import sendRequest from './utils/sendRequest'

/**
 * Egy adott hash-el rendelkező session lekérdezése.
 * @param loginHash - LoginHash.
 */
export default async function getSession (
  loginHash: string
): Promise<ISession | null> {
  const url = makeUrl(EAuthRoute.GetByHash, [ loginHash ])

  const { data, isSuccess } = await sendRequest<IGetSessionByHashResponse>('GET', url)

  if (!isSuccess) {
    return null
  }

  return data.session
}
