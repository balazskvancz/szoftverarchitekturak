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

export interface ILoginResponse {
  readonly loginHash: string
}

export interface ILogoutRequest extends ILoginResponse {}

export interface IDigestSession extends ISession {
  readonly user: IUser | null
}

/* eslint-disable no-shadow */
export enum EAuthRoute {
  GetByHash = '/api/auth/get-by-hash',
  Login     = '/api/auth/login',
  Logout    = '/api/auth/logout'
}
