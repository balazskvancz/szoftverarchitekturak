import makeUrl from '@common/utils/makeUrl'

import { EAuthRoute } from '../../definitions'

import type {
  IDigestSession,
  IGetDigestSessionResponse
} from '../../definitions'

import api from '../api'

/**
 * Elkér egy adott session-t loginHash alapján.
 * @param loginHash - A loginHash.
 */
export default async function getDigestSession (
  loginHash: string
): Promise<IDigestSession | null> {
  const url = makeUrl(EAuthRoute.GetDigest, [ loginHash ])

  const { error, data } = await api.get<IGetDigestSessionResponse>(url)

  if (error) {
    return null
  }

  return data.digestSession
}
