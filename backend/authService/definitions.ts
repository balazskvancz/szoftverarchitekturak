export type {
  IConfig,
  IDatabaseConfig
} from '@common/definitions'

export interface ISession {
  readonly loginHash: string
  readonly userId: number
  readonly startedAt: string
  readonly endedAt: string | null
}

export interface ILogoutRequest {
  readonly loginHash: string
}

export interface ILogin {
  readonly email: string
  readonly pass: string
}

/* eslint-disable no-shadow */
export enum EAuthRoute {
  GetUser =     '/api/auth/check-hash/:loginhash',
  GetRole =     '/api/auth/check-role/:loginhash',
  Login =       '/api/auth/login',
  Logout =      '/api/auth/logout'
}
