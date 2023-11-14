import type { IError, TErrorCodes, TErrorMessages } from './definitions'

export type TError = (
  'ERR_WRONG_POSTDATA'          |
  'ERR_WRONG_PARAM'             |
  'ERR_USER_NOT_AUTHENTICATED'  |
  'ERR_NOT_ADMIN'               |
  'ERR_NOT_CUSTOMER'            |
  'ERR_NOT_COURIER'             |

  'ERR_DB_INSERT'               |
  'ERR_DB_UPDATE'               |
  'ERR_DB_DELETE'
)

const ERROR_CODES: TErrorCodes<TError> = {
  ERR_WRONG_PARAM:            100,
  ERR_WRONG_POSTDATA:         101,
  ERR_USER_NOT_AUTHENTICATED: 102,
  ERR_NOT_ADMIN:              103,
  ERR_NOT_CUSTOMER:           104,
  ERR_NOT_COURIER:            105,

  ERR_DB_DELETE:              200,
  ERR_DB_INSERT:              201,
  ERR_DB_UPDATE:              202
}

const ERROR_MESSAGES: TErrorMessages<TError> = {
  ERR_WRONG_PARAM:            'Hibás paraméter!',
  ERR_WRONG_POSTDATA:         'Nem megfelelő a felküldött adat!',
  ERR_USER_NOT_AUTHENTICATED: 'Nincs bejelentkezett felhasználó!',
  ERR_NOT_ADMIN:              'A felhasználó nem admin!',
  ERR_NOT_CUSTOMER:           'A felhasználó nem sima felhasználó!',
  ERR_NOT_COURIER:            'A felhasználó nem futár!',

  ERR_DB_DELETE:              'Sikertelen adatbázis törlés!',
  ERR_DB_INSERT:              'Sikertelen adatbázis beszúrás!',
  ERR_DB_UPDATE:              'Sikertelen adatbázis módosítás!'
}

const Error: IError<TError> = {
  codes: ERROR_CODES, messages: ERROR_MESSAGES
}

export default Error
