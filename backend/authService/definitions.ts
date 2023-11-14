/* eslint-disable no-shadow */
export type {
  IConfig,
  IDatabaseConfig
} from '@common/definitions'

export type { ILogin } from '../userService/definitions'

import type { IUser } from '../userService/definitions'

export interface IBaseSession {
  readonly loginHash: string
  readonly userId: number
}

export interface ISession extends IBaseSession {
  readonly startedAt: string
  readonly endedAt: string | null
}

export interface IGetSessionByHashResponse {
  readonly session: ISession
}

export interface IDigestSession extends ISession {
  readonly user: IUser | null
}

export interface IGetDigestSessionResponse {
  readonly digestSession: IDigestSession
}

export interface ILoginResponse {
  readonly loginHash: string
}

export interface ILogoutRequest extends ILoginResponse {}

export enum EAuthRoute {
  GetDigest  = '/api/auth/get-digest/:loginHash',
  GetByHash  = '/api/auth/get-by-hash/:loginHash',
  Login      = '/api/auth/login',
  Logout     = '/api/auth/logout'
}
