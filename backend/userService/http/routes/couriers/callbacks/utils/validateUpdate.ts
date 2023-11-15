import type { IFormError } from '@common/definitions'

import Validator from '@common/Validator/Validator'

import commonValidateUpdate from '../../../utils/validateUpdate'

/**
 * Módosítás validációja.
 * @param data - Beszúrandó adat.
 */
export default function validateUpdate (data: unknown): IFormError[] {
  const errors: IFormError[] = []

  if (
    !Validator.isObjectHaveKeys(data, [ 'telephone' ]) ||
    !Validator.isNonEmptyString(data.telephone)
  ) {
    errors.push({
      key: 'telephone',
      message: 'Telefonszám megadása kötelező'
    })
  }

  return [ ...errors, ...commonValidateUpdate(data) ]
}
