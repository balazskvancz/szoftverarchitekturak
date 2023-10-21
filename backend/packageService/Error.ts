import type { IError, TErrorCodes, TErrorMessages } from '@common/backend/definitions'

import CommonError from '@common/backend/Error'

import type { TError as TCommonError } from '@common/backend/Error'

type TError = (
  'ERR_NIT'
)

const ERROR_CODES: TErrorCodes<TError> = {
  ERR_NIT: 1
}

const ERROR_MESSAGES: TErrorMessages<TError> = {
  ERR_NIT: 'nit'
}

const Error: IError<TError | TCommonError> = {
  codes: { ...ERROR_CODES,  ...CommonError.codes },
  messages: {
    ...ERROR_MESSAGES,
    ...CommonError.messages
  }
}

export default Error
