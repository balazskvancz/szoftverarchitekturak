import encodeQuery from '@common/utils/encodeQuery'

import { API_KEY, SEARCH_URL } from '../definitions'

import httpRequest from '@common/http/httpRequest'

import type {
  IProperty,
  IGetRequest,
  IGetResponse,
  IAddressDetails
} from '../definitions'

const HTTP_STATUS_OK = 200

/**
 * Tényleges lekérdezés.
 * @param details - Cím adatok.
 */
export default async function search (
  details: IAddressDetails
): Promise<IProperty | null> {
  const params: IGetRequest = {
    ...details,

    apiKey: API_KEY
  }

  const encoded = encodeQuery(params)

  const url = `${ SEARCH_URL }?${ encoded }`

  const response = await httpRequest(url)

  if (response.statusCode !== HTTP_STATUS_OK) {
    return null
  }

  const casted = response.data as IGetResponse

  return casted.features[0].properties
}
