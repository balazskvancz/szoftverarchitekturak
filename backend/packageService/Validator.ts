import CommonValidator from '@common/Validator/Validator'

import { PACKAGE_LIFECYCLES } from './definitions'

import type { TPackageLifeCycleAction } from './definitions'

export default class Validator extends CommonValidator {
  /**
   * Megmondja, egy ismeretlen paraméterről, hogy az valid TPackageLifeCycleAction-e.
   * @param p - Az ismeretlen paraméter.
   */
  public static isValidPackageLifeCycleAction (p: unknown): p is TPackageLifeCycleAction {
    return (
      Validator.isNonEmptyString(p) &&
      Validator.isOneOf(p, ...PACKAGE_LIFECYCLES)
    )
  }
}
