import CrossRequest from '@common/CrossRequest/CrossRequest'
import type { ICrossResponse } from '@common/CrossRequest/definitions'

import type { TMethod } from '../../../definitions'

import createOptions from './createOptions'

/**
 * Egy szervíz-szervíz közötti kommunikációt megvalósító kérés.
 * @param method              - A kérés metóusa.
 * @param url                 - Az URL.
 * @param data                - A küldendő adat – ha van.
 * @param needToParseResponse - Kell-e parseolni a választ.
 */
export default function sendRequest <T extends TAnyObject> (
  method: TMethod,
  url: string,
  data?: TAnyObject,
  needToParseResponse = true
): Promise<ICrossResponse<T>> {
  const options = createOptions(method, url, Boolean(data))

  return CrossRequest.send<T>(options, data, needToParseResponse)
}
