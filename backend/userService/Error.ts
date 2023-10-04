import type { IError, TErrorCodes, TErrorMessages } from '@common/backend/definitions'

import CommonError from '@common/backend/Error'

import type { TError as TCommonError } from '@common/backend/Error'

type TError = (
  'ERR_NOT_IMPLEMENTED_YES'
)

const ERROR_CODES: TErrorCodes<TError> = {
  ERR_NOT_IMPLEMENTED_YES: 1
}

const ERROR_MESSAGES: TErrorMessages<TError> = {
  ERR_NOT_IMPLEMENTED_YES: ''
}

const Error: IError<TError | TCommonError> = {
  codes: { ...ERROR_CODES, ...CommonError.codes },
  messages: {
    ...ERROR_MESSAGES,
    ...CommonError.messages
  }
}

export default Error
