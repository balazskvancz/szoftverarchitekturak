export type {
  IConfig,
  IDatabaseConfig
} from '@common/definitions'

/* eslint-disable no-shadow */
export enum EUserRole {
  Costumer = 1,
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

/* eslint-disable no-shadow */
export enum EUsersRoute {
  GetAll = '/api/user/users/get-all',
  Insert = '/api/user/users/insert',
  Register = '/api/user/registration',
  GetCustomers = '/api/user/customers',
  DeleteCustomer = '/api/user/customers/:id',
  UpdateCustomer = '/api/user/customers/:id',
  GetCustomer = '/api/user/customers/:id'
}
