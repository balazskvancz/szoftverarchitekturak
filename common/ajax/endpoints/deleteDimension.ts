import makeUrl from '@common/utils/makeUrl'

import { EDimensionsRoute } from '../../definitions'

import type { IGeneralError } from '../../definitions'

import api from '../api'

/**
 * Egy adott dimenzió törlése.
 * @param id - Törlendő egyed azonosítója.
 */
export default async function deleteDimension (id: number): Promise<IGeneralError | null> {
  const url = makeUrl(EDimensionsRoute.DeleteById, [ id ])

  const { error } = await api.delete(url)

  return error
}
