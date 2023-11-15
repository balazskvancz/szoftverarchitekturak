import makeUrl from '@common/utils/makeUrl'

import { ECustomerAddressesRoute } from '../../definitions'

import type { IGeneralError } from '../../definitions'

import api from '../api'

/**
 * Egy adott azonosítóval rendelkező cím törlése.
 * @param addressId - Cím azonsosító.
 */
export default async function deleteAddress (addressId: number): Promise<IGeneralError | null> {
  const url = makeUrl(ECustomerAddressesRoute.DeleteById, [ addressId ])

  const { error } = await api.delete(url)

  return error
}
