import makeUrl from '@common/utils/makeUrl'

import { ECustomerAddressesRoute } from '../../definitions'

import type { IGeneralError } from '../../definitions'

import api from '../api'

/**
 * Egy felhasználó-cím összerendelés törlése.
 * @param addressId - Cím azonosító.
 */
export default async function deleteCustomerAddress (
  addressId: number
): Promise<IGeneralError | null> {
  const url = makeUrl(ECustomerAddressesRoute.DeleteById, [ addressId ])

  const { error } = await api.delete(url)

  return error
}
