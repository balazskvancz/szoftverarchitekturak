import Validator from '../Validator'

import type { IParams } from '../definitions'

import parseByType from './parseByType'

/**
 * Egy ismeretlen objektumot hajt végre típusillesztést.
 * @param params - Ismeretlen bejövő queryparams.
 */
export default function matchObject <T = IParams> (params: unknown): T | IParams {
  if (!Validator.isNonEmptyObject(params)) {
    return {}
  }

  const paramsWithTypes: IParams = Object.entries(params).reduce((acc, [ key, value ]) => {
    acc[key] = parseByType(value)

    return acc
  }, {} as TMutable<IParams>)

  return paramsWithTypes
}
