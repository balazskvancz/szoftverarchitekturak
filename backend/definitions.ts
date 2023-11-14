/* eslint-disable no-shadow */
export interface ICrossRequestOptions {
  readonly host: string
  readonly port: number
  readonly path: string
  readonly method: string

  readonly headers?: TAnyObject // Egyelőre.
}

export type TMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export const GATEWAY_HOST = 'localhost'
export const GATEWAY_PORT = 3000

export enum EBindValue {
  User = 'user'
}

export {
  LOGIN_HASH_COOKIE_NAME
} from '../common/definitions'

/** AuthService. */
export {
  EAuthRoute
} from './authService/definitions'

export type {
  ISession,
  IDigestSession,
  IGetDigestSessionResponse,
  IGetSessionByHashResponse
} from './authService/definitions'

/** UserService. */
export {
  EUsersRoute
} from './userService/definitions'

export type {
  IUser,
  IGetUserByIdResponse,
  IGetUserIdByEmailPassResponse
} from './userService/definitions'
