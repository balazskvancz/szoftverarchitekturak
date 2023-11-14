import type { IError, TErrorCodes, TErrorMessages } from '@common/backend/definitions'

import CommonError from '@common/backend/Error'

import type { TError as TCommonError } from '@common/backend/Error'

type TError = (
  'ERR_DIMENSION_NOT_EXISTS'        |
  'ERR_ADDRESS_NOT_EXISTS'          |
  'ERR_PACKAGE_NOT_EXISTS'          |
  'ERR_WRONG_PACKAGE_ACTION'        |
  'ERR_NEXT_PACKAGE_ACTION_INVALID'
)

const ERROR_CODES: TErrorCodes<TError> = {
  ERR_DIMENSION_NOT_EXISTS:         30100,
  ERR_ADDRESS_NOT_EXISTS:           30101,
  ERR_PACKAGE_NOT_EXISTS:           30200,
  ERR_WRONG_PACKAGE_ACTION:         30201,
  ERR_NEXT_PACKAGE_ACTION_INVALID:  30202

}

const ERROR_MESSAGES: TErrorMessages<TError> = {
  ERR_DIMENSION_NOT_EXISTS:         'A dimenzió nem létezik!',
  ERR_ADDRESS_NOT_EXISTS:           'A cím nem létezik!',
  ERR_PACKAGE_NOT_EXISTS:           'A csomag nem létezik!',
  ERR_WRONG_PACKAGE_ACTION:         'A csomag életciklus művelet nem érvényes!',
  ERR_NEXT_PACKAGE_ACTION_INVALID:  'A csomag nem helyezhető a megadott állapotba!'
}

const Error: IError<TError | TCommonError> = {
  codes: { ...ERROR_CODES,  ...CommonError.codes },
  messages: {
    ...ERROR_MESSAGES,
    ...CommonError.messages
  }
}

export default Error
