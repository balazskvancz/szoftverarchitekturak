import type { IError, TErrorCodes, TErrorMessages } from '@common/backend/definitions'

import CommonError from '@common/backend/Error'

import type { TError as TCommonError } from '@common/backend/Error'

type TError = (
  'ERR_DIMENSION_NOT_EXISTS' |
  'ERR_ADDRESS_NOT_EXISTS'
)

const ERROR_CODES: TErrorCodes<TError> = {
  ERR_DIMENSION_NOT_EXISTS: 30100,
  ERR_ADDRESS_NOT_EXISTS:   30101
}

const ERROR_MESSAGES: TErrorMessages<TError> = {
  ERR_DIMENSION_NOT_EXISTS: 'A dimenzió nem létezik!',
  ERR_ADDRESS_NOT_EXISTS:   'A cím nem létezik!'
}

const Error: IError<TError | TCommonError> = {
  codes: { ...ERROR_CODES,  ...CommonError.codes },
  messages: {
    ...ERROR_MESSAGES,
    ...CommonError.messages
  }
}

export default Error
