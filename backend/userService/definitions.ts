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

/* eslint-disable no-shadow */
export enum EAdminsRoute {
  GetAdmins =   '/api/user/admins',
  GetAdmin =    '/api/user/admins/:id',
  DeleteAdmin = '/api/user/admins/:id',
  UpdateAdmin = '/api/user/admins/:id'
}

/* eslint-disable no-shadow */
export enum ECourierRoute {
  GetCouriers =     '/api/user/couriers',
  GetCourier =      '/api/user/couriers/:id',
  RegisterCourier = '/api/user/couriers',
  DeleteCourier =   '/api/user/couriers/:id',
  UpdateCourier =   '/api/user/couriers/:id',
  SetWorkingDay =   '/api/user/couriers/set-working-day'
}

/* eslint-disable no-shadow */
export enum ECustomersRoute {
  GetCustomers = '/api/user/customers',
  GetCustomer = '/api/user/customers/:id',
  DeleteCustomer = '/api/user/customers/:id',
  UpdateCustomer = '/api/user/customers/:id'
}
