import type { IError, TErrorCodes, TErrorMessages } from '@common/backend/definitions'

import CommonError from '@common/backend/Error'

import type { TError as TCommonError } from '@common/backend/Error'

type TError = (
  'ERR_INVALID_HASH'        |
  'ERR_NON_EXISTING_USER'   |
  'ERR_MISSING_BODY'        |
  'ERR_WRONG_POSTDATA'      |
  'ERR_MISSING_LOGIN_HASH'  |
  'ERR_WRONG_LOGIN_DATA'    |
  'ERR_SESSION_NOT_EXISTS'
)

const ERROR_CODES: TErrorCodes<TError> = {
  ERR_INVALID_HASH:       1001,
  ERR_NON_EXISTING_USER:  1002,
  ERR_MISSING_BODY:       1003,
  ERR_WRONG_POSTDATA:     1004,
  ERR_MISSING_LOGIN_HASH: 1005,
  ERR_WRONG_LOGIN_DATA:   1006,
  ERR_SESSION_NOT_EXISTS: 1007
}

const ERROR_MESSAGES: TErrorMessages<TError> = {
  ERR_INVALID_HASH:         'A megadott hash érvénytelen!',
  ERR_NON_EXISTING_USER:    'A megadott felhasználó nem létezik',
  ERR_MISSING_BODY:         'Hiányzó request body!',
  ERR_WRONG_POSTDATA:       'Nem megfelelő küldött adat!',
  ERR_MISSING_LOGIN_HASH:   'Hiányzó `loginHash`!',
  ERR_WRONG_LOGIN_DATA:     'A megadott bejelentkezési adatok érvénytelenek!',
  ERR_SESSION_NOT_EXISTS:   'Nincs ilyen munkamenet!'
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
