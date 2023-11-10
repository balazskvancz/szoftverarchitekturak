import type { IFormError } from '@common/definitions'

import Validator from '@common/Validator/Validator'

/**
 * Validálja a bejövő adatot.
 * @param data - Bejövő adat.
 */
export default function validateUpdate (data: unknown): IFormError[] {
  const errors: IFormError[] = []

  if (
    !Validator.isObjectHaveKeys(data, [ 'email' ]) ||
    !Validator.isNonEmptyString(data.email)
  ) {
    errors.push({
      key: 'email',
      message: 'Kötelező e-mailt megadni!'
    })
  }

  if (
    !Validator.isObjectHaveKeys(data, [ 'name' ]) ||
    !Validator.isNonEmptyString(data.name)
  ) {
    errors.push({
      key: 'name',
      message: 'Kötelező nevet megadni!'
    })
  }

  return errors
}
