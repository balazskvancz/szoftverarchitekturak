import type { IFormError } from '@common/definitions'

import Validator from '@common/Validator/Validator'

import commonValidateInsert from '../../../utils/validateInsert'

/**
 * Beszúrás validációja.
 * @param data - Beszúrandó adat.
 */
export default function validateInsert (data: unknown): IFormError[] {
  const errors: IFormError[] = []

  if (
    !Validator.isObjectHaveKeys(data, [ 'phoneNum' ]) ||
    !Validator.isNonEmptyString(data.phoneNum)
  ) {
    errors.push({
      key: 'phoneNum',
      message: 'Telefonszám megadása kötelező'
    })
  }

  return [ ...errors, ...commonValidateInsert(data) ]
}
