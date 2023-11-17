import makeUrl from '@common/utils/makeUrl'

import { EAuthRoute } from '../../definitions'

import type { IDigestSession, IGetDigestSessionResponse } from '../../definitions'

import sendRequest from './utils/sendRequest'

/**
 * Egy összetett munkamenet lekérdezése loginHash alapján.
 * @param loginHash - LoginHash.
 */
export default async function getDigestSession (
  loginHash: string
): Promise<IDigestSession | null> {
  const url = makeUrl(EAuthRoute.GetDigest, [ loginHash ])

  const { isSuccess, data } = await sendRequest<IGetDigestSessionResponse>('GET', url)

  if (!isSuccess) {
    return null
  }

  return data.digestSession
}
