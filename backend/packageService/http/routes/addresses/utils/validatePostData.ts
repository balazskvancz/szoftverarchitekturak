import type { IFormError } from '@common/definitions'

import Validator from '@common/Validator/Validator'

import type { IBaseAddress } from '@packageService/definitions'

const ERROR_MESSAGE = 'A mező kitöltése kötelező!'

/**
 * Validálja a bejövő adatot.
 * @param d - Validálandó adat.
 */
export default function validatePostData (d: IBaseAddress): IFormError[] {
  const errors: IFormError[] = []

  if (!Validator.isNonEmptyString(d.city)) {
    errors.push({
      key: 'city',
      message: ERROR_MESSAGE
    })
  }

  if (!Validator.isNonEmptyString(d.country)) {
    errors.push({
      key: 'country',
      message: ERROR_MESSAGE
    })
  }

  if (!Validator.isNonEmptyString(d.house)) {
    errors.push({
      key: 'house',
      message: ERROR_MESSAGE
    })
  }

  if (!Validator.isNonEmptyString(d.postalCode)) {
    errors.push({
      key: 'postalCode',
      message: ERROR_MESSAGE
    })
  }

  if (!Validator.isNonEmptyString(d.street)) {
    errors.push({
      key: 'street',
      message: ERROR_MESSAGE
    })
  }

  return errors
}
