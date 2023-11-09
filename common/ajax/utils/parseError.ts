import type { IFormError } from '@common/definitions'

import type { IGeneralError } from '../../definitions'

import Validator from '../../../common/Validator/Validator'

/**
 * Visszafejti az Axios által lekezelt hibát a mi általunk használt formára.
 * @param data - Az ismeretlen adat.
 */
export default function parseError (data: unknown): IGeneralError {
  const errUnknown: IGeneralError = {
    code: -1,
    message: 'Ismeretlen hiba!'
  }

  if (
    !Validator.isNonEmptyObject(data) ||
    !Validator.isObjectHaveKeys(data, [ 'response' ])
  ) {
    return errUnknown
  }

  if (
    !Validator.isNonEmptyObject(data.response) ||
    !Validator.isObjectHaveKeys(data.response, [ 'data' ])
  ) {
    return errUnknown
  }

  const { data: errorData } = data.response

  if (
    !Validator.isObjectHaveKeys(errorData, [ 'code' ]) ||
    !Validator.isNumber(errorData.code)
  ) {
    return errUnknown
  }

  if (
    Validator.isObjectHaveKeys(errorData, [ 'message' ]) &&
    Validator.isNonEmptyString(errorData.message)
  ) {
    return {
      code: errorData.code,
      message: errorData.message
    }
  }

  if (
    Validator.isObjectHaveKeys(errorData, [ 'formErrors' ]) &&
    Validator.isValidFormErrors(errorData.formErrors)
  ) {
    return {
      code: errorData.code,
      formErrors: errorData.formErrors as IFormError[]
    }
  }

  return errUnknown
}
