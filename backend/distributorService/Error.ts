import type { IError, TErrorCodes, TErrorMessages } from '@common/backend/definitions'

import CommonError from '@common/backend/Error'

import type { TError as TCommonError } from '@common/backend/Error'

type TError = (
  'ERR_NO_CURRENTLY_WORKING_COURIER'  |
  'ERR_GET_PACKAGES_RESPONSE'         |
  'ERR_NO_PACKAGE_TO_DEAL_WITH'
)

const ERROR_CODES: TErrorCodes<TError> = {
  ERR_NO_CURRENTLY_WORKING_COURIER: 20001,
  ERR_GET_PACKAGES_RESPONSE:        20002,
  ERR_NO_PACKAGE_TO_DEAL_WITH:      20003
}

const ERROR_MESSAGES: TErrorMessages<TError> = {
  ERR_NO_CURRENTLY_WORKING_COURIER: 'Nincs éppen aktív futár!',
  ERR_GET_PACKAGES_RESPONSE:        'Hiányzó csomagok válasz!',
  ERR_NO_PACKAGE_TO_DEAL_WITH:      'Nincs csomag, amivel foglalkozni kellene!'
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
