import { EAddressesRoute } from '../../definitions'

import type {
  IGeneralError,
  IInsertedIdResponse,
  IInsertAddressRequest
} from '../../definitions'

import sendRequest from './utils/sendRequest'

/**
 * Egy új cím beszúrása.
 * @param data - Beszúrandó adat.
 */
export default async function insertAddress (
  data: IInsertAddressRequest
): Promise<IGeneralError | number> {
  const {
    data: resData,
    isSuccess
  } = await sendRequest<IInsertedIdResponse>('POST', EAddressesRoute.Insert, data)

  if (!isSuccess) {
    // Bekamuzzuk.
    return resData as IGeneralError
  }

  return resData.insertedId
}
