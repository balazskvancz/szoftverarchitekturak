import CommonValidator from '../Validator/Validator'

import { SUPPORTED_HTTP_METHODS } from './definitions'
import type { TSuppoprtedHttpMethod } from './definitions'

export default class Validator extends CommonValidator {
  /**
   * Megmondja egy ismeretlen paraméterről, hogy az valid és támogatott HTTP metódus-e.
   * @param param - Az ismeretlen paraméter.
   */
  public static isSupportedMethod (param: unknown): param is TSuppoprtedHttpMethod {
    return (
      Validator.isNonEmptyString(param) &&
      Validator.isOneOf(param, ...SUPPORTED_HTTP_METHODS)
    )
  }
}
