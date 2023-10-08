export type {
  IConfig,
  IDatabaseConfig
} from '@common/definitions'

/* eslint-disable no-shadow */
export enum EUserRole {
  Customer = 1,
  Courier = 2,
  Admin = 3
}

/* eslint-disable no-shadow */
export enum EUserRow {
  name = 'name',
  email = 'email',
  password = 'password'
}

export interface IRegisterUser {
  readonly name: string
  readonly email: string
  readonly password: string
}

export interface IInsertUser extends IRegisterUser {
  readonly role: EUserRole
}

export interface IUser extends IInsertUser {
  readonly id: number
  readonly createdAt: string
}

export interface IRegisterCourier extends IRegisterUser {
  readonly phoneNum: string
}

/* eslint-disable no-shadow */
export enum EUsersRoute {
  GetAll =      '/api/user/users/get-all',
  Insert =      '/api/user/users/insert',
  Register =    '/api/user/registration',
  UndoDelete =  '/api/user/undo-delete/:id'
}
