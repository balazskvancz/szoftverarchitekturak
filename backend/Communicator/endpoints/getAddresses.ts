import { EAddressesRoute } from '../../definitions'

import type {
  TAddresses,
  IGetAddressesByIdsRequest,
  IGetAddressesByIdsResponse
} from '../../definitions'

import sendRequest from './utils/sendRequest'

/**
 * Tömeges cím lekérdezés.
 * @param ids - Címek azonosítói.
 */
export default async function getAddresses (ids: number[]): Promise<TAddresses> {
  const sendingData: IGetAddressesByIdsRequest = {
    ids
  }

  const {  data, isSuccess } = await sendRequest<IGetAddressesByIdsResponse>('POST', EAddressesRoute.GetByIds, sendingData)

  if (!isSuccess) {
    return []
  }

  return data.addresses
}
