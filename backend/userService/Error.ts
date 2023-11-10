import type { IError, TErrorCodes, TErrorMessages } from '@common/backend/definitions'

import CommonError from '@common/backend/Error'

import type { TError as TCommonError } from '@common/backend/Error'

type TError = (
  'ERR_NOT_IMPLEMENTED_YES' |
  'ERR_MISSING_BODY' |
  'ERR_MISSING_ID' |
  'ERR_INVALID_ID' |
  'ERR_MISSING_KEY' |
  'ERR_INVALID_BODY' |
  'ERR_USER_NOT_EXISTS'
)

const ERROR_CODES: TErrorCodes<TError> = {
  ERR_NOT_IMPLEMENTED_YES:  1,
  ERR_MISSING_BODY:         2,
  ERR_MISSING_ID:           3,
  ERR_INVALID_ID:           4,
  ERR_MISSING_KEY:          5,
  ERR_INVALID_BODY:         6,
  ERR_USER_NOT_EXISTS:      7

}

const ERROR_MESSAGES: TErrorMessages<TError> = {
  ERR_NOT_IMPLEMENTED_YES:  '',
  ERR_MISSING_BODY:         'Hiányzó törzs!',
  ERR_MISSING_ID:           'Hiányzó id!',
  ERR_INVALID_ID:           'Rossz id!',
  ERR_MISSING_KEY:          'Hinyázó kulcs!',
  ERR_INVALID_BODY:         'Rossz törzs!',
  ERR_USER_NOT_EXISTS:      'A felhasználó nem létezik!'
}

const Error: IError<TError | TCommonError> = {
  codes: { ...ERROR_CODES, ...CommonError.codes },
  messages: {
    ...ERROR_MESSAGES,
    ...CommonError.messages
  }
}

export default Error
