import { GATEWAY_HOST, GATEWAY_PORT } from '../../../definitions'
import type { ICrossRequestOptions } from '../../../definitions'

import type { TMethod } from '../../../definitions'

/**
 * Létrehozza a megfelelő options-t a közbenső kommunikációhoz.
 * @param method    - A kérés metódusa.
 * @param path      - A URL.
 * @param hasData   - Lesz-e küldendő adat.
 */
export default function createOptions (
  method: TMethod,
  path: string,
  hasData = false
): ICrossRequestOptions {
  const headers = hasData
    ? {
      'Content-Type': 'application/json; utf8',
      'Access-Control-Allow-Origin': '*'
    }
    : {}

  return {
    headers,
    host: GATEWAY_HOST,
    port: GATEWAY_PORT,
    method,
    path
  }
}
