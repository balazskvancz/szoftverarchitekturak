import Validator from '../Validator'

import type { IQueryParams } from '../definitions'

import parseByType from './parseByType'

/**
 * Leparsolja a query paramétereket a bejövő URL alapján.
 * @param url - A vizsgálandó URL.
 */
export default function parseQueryParams (url: string): IQueryParams {
  if (url === '') {
    return {}
  }

  const queryIndex = url.indexOf('?')

  if (queryIndex === -1) {
    return {}
  }

  const splitted = url.slice((queryIndex + 1)).split('&')

  const params: IQueryParams = splitted.reduce((acc, curr) => {
    const [ key, value ] = curr.split('=')

    if (
      !Validator.isNonEmptyString(key) ||
      !Validator.isNonEmptyString(value)
    ) {
      return acc
    }

    acc[key] = parseByType(value)

    return acc
  }, {} as TMutable<IQueryParams>)

  return params
}
