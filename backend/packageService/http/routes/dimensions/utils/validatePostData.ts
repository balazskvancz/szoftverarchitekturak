import type { IFormError } from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import type { IBaseDimension } from '../../../../definitions'

const ERROR_MESSAGE = 'A mező értékének pozitív számnak kell lennie!'

/**
 * Validálja a bejövő formdatát.
 * @param d - A bejövő adat.
 */
export default function validatePostData (d: IBaseDimension): IFormError[] {
  const errors: IFormError[] = []

  if (!Validator.isPositiveNumber(d.depth)) {
    errors.push({
      key: 'depth',
      message: ERROR_MESSAGE
    })
  }

  if (!Validator.isPositiveNumber(d.length)) {
    errors.push({
      key: 'length',
      message: ERROR_MESSAGE
    })
  }

  if (!Validator.isPositiveNumber(d.width)) {
    errors.push({
      key: 'width',
      message: ERROR_MESSAGE
    })
  }

  return errors
}
