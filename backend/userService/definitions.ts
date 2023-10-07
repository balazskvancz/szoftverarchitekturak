export type {
  IConfig,
  IDatabaseConfig
} from '@common/definitions'

export interface IInsertUser {
  readonly name: string
  readonly email: string
  readonly password: string
}

export interface IUser extends IInsertUser {
  readonly id: number
  readonly createdAt: string
}

/* eslint-disable no-shadow */
export enum EUsersRoute {
  GetAll = '/api/user/users/get-all',
  Insert = '/api/user/users/insert'
}
