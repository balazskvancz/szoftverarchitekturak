import type { IError, TErrorCodes, TErrorMessages } from '@common/backend/definitions'

import CommonError from '@common/backend/Error'

import type { TError as TCommonError } from '@common/backend/Error'

type TError = (
  'ERR_INVALID_HASH' |
  'ERR_NON_EXISTING_USER' |
  'ERR_MISSING_BODY' |
  'ERR_WRONG_POSTDATA' |
  'ERR_DB_INSERT'
)

const ERROR_CODES: TErrorCodes<TError> = {
  ERR_INVALID_HASH: 1,
  ERR_NON_EXISTING_USER: 2,
  ERR_MISSING_BODY: 3,
  ERR_WRONG_POSTDATA: 4,
  ERR_DB_INSERT: 5
}

const ERROR_MESSAGES: TErrorMessages<TError> = {
  ERR_INVALID_HASH: 'A megadott hash érvénytelen!',
  ERR_NON_EXISTING_USER: 'A megadott felhasználó nem létezik',
  ERR_MISSING_BODY: 'Hiányzó Login adatok',
  ERR_WRONG_POSTDATA: 'Hiányzó adat',
  ERR_DB_INSERT: 'Sikertelen Adatbázisművelet'
}

const Error: IError<TError | TCommonError> = {
  codes: { ...ERROR_CODES, ...CommonError.codes },
  messages: {
    ...ERROR_MESSAGES,
    ...CommonError.messages
  }
}

export default Error
