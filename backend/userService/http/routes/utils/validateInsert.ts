import type { IFormError } from '@common/definitions'

import Validator from '@common/Validator/Validator'

import validateUpdate from './validateUpdate'

/**
 * Validálja a beszúráshoz szükséges adatot.
 * @param data - Bejövő adat.
 */
export default function validateInsert (data: unknown): IFormError[] {
  const errors: IFormError[] = []

  if (
    !Validator.isObjectHaveKeys(data, [ 'password' ]) ||
    !Validator.isNonEmptyString(data.password)
  ) {
    errors.push({
      key: 'password',
      message: 'Kötelező jelszót megadni!'
    })
  }

  if (
    !Validator.isObjectHaveKeys(data, [ 'passwordRepeat' ]) ||
    !Validator.isNonEmptyString(data.passwordRepeat)
  ) {
    errors.push({
      key: 'passwordRepeat',
      message: 'Kötelező jelszó ismétlést megadni!'
    })
  }

  if (
    !Validator.isObjectHaveKeys(data, [ 'password', 'passwordRepeat' ]) ||
    data.password !== data.passwordRepeat
  ) {
    errors.push({
      key: 'password',
      message: 'A megadott jelszavaknak egyezniük kell!'
    })

    errors.push({
      key: 'passwordRepeat',
      message: 'A megadott jelszavaknak egyezniük kell!'
    })
  }

  return [ ...errors, ...validateUpdate(data) ]
}
