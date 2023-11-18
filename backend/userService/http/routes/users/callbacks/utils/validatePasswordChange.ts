import type { IChangePasswordRequest } from '@backend/userService/definitions'
import type { IFormError } from '@common/definitions'

import Validator from '@common/Validator/Validator'

/**
 * Beszúrás validációja.
 * @param data - Beszúrandó adat.
 */
export default function validatePasswordChange (data: unknown): IFormError[] {
  const formErrors: IFormError[] = []

  if (
    !Validator.isObjectHaveKeys(data, [ 'currentPassword' ]) ||
    !Validator.isNonEmptyString(data.currentPassword)
  ) {
    formErrors.push({
      key: 'currentPassword',
      message: 'A jelenlegi jelszó megadása kötelező!'
    })
  }

  if (
    !Validator.isObjectHaveKeys(data, [ 'password' ]) ||
    !Validator.isNonEmptyString(data.password)
  ) {
    formErrors.push({
      key: 'password',
      message: 'Az új jelszó megadása kötelező!'
    })
  }

  if (
    !Validator.isObjectHaveKeys(data, [ 'passwordRepeat' ]) ||
    !Validator.isNonEmptyString(data.passwordRepeat)
  ) {
    formErrors.push({
      key: 'passwordRepeat',
      message: 'Az új jelszó ismétlésének megadása kötelező!'
    })
  }

  if (Validator.isNonEmptyArray(formErrors)) {
    return formErrors
  }

  const casted = data as IChangePasswordRequest

  if (casted.password !== casted.passwordRepeat) {
    formErrors.push({
      key: 'password',
      message: 'A megadott jelszavak nem egyeznek!'
    },
    {
      key: 'passwordRepeat',
      message: 'A megadott jelszavak nem egyeznek!'
    })
  }

  return formErrors
}
