import type { IError, TErrorCodes, TErrorMessages } from '@common/backend/definitions'

import CommonError from '@common/backend/Error'

import type { TError as TCommonError } from '@common/backend/Error'

type TError = (
  'ERR_MISSING_BODY'          |
  'ERR_MISSING_ID'            |
  'ERR_INVALID_ID'            |
  'ERR_MISSING_KEY'           |
  'ERR_INVALID_BODY'          |
  'ERR_USER_NOT_EXISTS'       |
  'ERR_NOTHING_TO_INSERT'     |
  'ERR_TODAY_IS_NOT_WORK_DAY'
)

const ERROR_CODES: TErrorCodes<TError> = {
  ERR_MISSING_BODY:           40002,
  ERR_MISSING_ID:             40003,
  ERR_INVALID_ID:             40004,
  ERR_MISSING_KEY:            40005,
  ERR_INVALID_BODY:           40006,
  ERR_USER_NOT_EXISTS:        40007,
  ERR_NOTHING_TO_INSERT:      40008,
  ERR_TODAY_IS_NOT_WORK_DAY:  40009

}

const ERROR_MESSAGES: TErrorMessages<TError> = {
  ERR_MISSING_BODY:           'Hiányzó törzs!',
  ERR_MISSING_ID:             'Hiányzó id!',
  ERR_INVALID_ID:             'Rossz id!',
  ERR_MISSING_KEY:            'Hinyázó kulcs!',
  ERR_INVALID_BODY:           'Rossz törzs!',
  ERR_USER_NOT_EXISTS:        'A felhasználó nem létezik!',
  ERR_NOTHING_TO_INSERT:      'Nincs mit beszúrni!',
  ERR_TODAY_IS_NOT_WORK_DAY:  'A mai napon nem dolgozol!'
}

const Error: IError<TError | TCommonError> = {
  codes: {
    ...ERROR_CODES,
    ...CommonError.codes
  },
  messages: {
    ...ERROR_MESSAGES,
    ...CommonError.messages
  }
}

export default Error
