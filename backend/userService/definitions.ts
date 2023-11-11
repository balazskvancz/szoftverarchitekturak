/* eslint-disable no-shadow */
export type {
  IConfig,
  IDatabaseConfig
} from '@common/definitions'

export const USER_TYPES = [
  'admin', 'customer', 'courier'
] as const

export type TUserType = typeof USER_TYPES[number]

export interface IBaseUser {
  readonly email: string
  readonly name: string
}

export interface IPassword {
  readonly password: string
  readonly passwordRepeat: string
}

export interface IChangePasswordRequest extends IPassword {
  readonly currentPassword: string
}

export interface ILogin {
  readonly email: string
  readonly password: string
}

export interface IInsertUserRequest extends IBaseUser, IPassword {}

export interface IInsertUser extends IInsertUserRequest {
  readonly role: TUserType
}

export interface IUser extends IBaseUser {
  readonly id: number
  readonly createdAt: string
}

export type TUsers = readonly IUser[]

export interface IAdmin extends IUser {}

export type TAdmins = readonly IAdmin[]

export interface IBaseCourier extends IBaseUser {
  readonly phoneNum: string
}

export interface IInsertCourier extends IBaseCourier, IPassword {}

export interface IGetUserByIdResponse {
  readonly user: IUser | null
}

export interface IGetUserIdByEmailPassResponse {
  readonly userId: number | null
}

export interface IGetAllAdminsResponse {
  readonly admins: TAdmins
}

export interface IGetAdminByIdResponse {
  readonly admin: IAdmin | null
}

export interface ICourier extends IUser {
  readonly phoneNum: string
}

export type TCouriers = readonly ICourier[]

export interface IGetCourierByIdResponse {
  readonly courier: ICourier | null
}

export interface IGetAllCouriers {
  readonly couriers: TCouriers
}

export interface IBaseCustomer extends IBaseCourier {}

export interface IInsertCustomer extends IBaseCustomer, IPassword {}

export interface ICustomer extends ICourier {}

export type TCustomers = readonly ICustomer[]

export interface IGetCustomerByIdResponse {
  readonly customer: ICustomer | null

}

export interface IGetAllCustomersResponse {
  readonly customers: TCustomers
}

export enum EUsersRoute {
  DeleteById              = '/api/user/users/:id',
  GetAll                  = '/api/user/users/get-all',
  GetUserById             = '/api/user/users/:id',
  GetByEmailAndPassword   = '/api/user/get-by-email-and-password'
}

export enum EAdminsRoute {
  Get         = '/api/user/admins',
  GetById     = '/api/user/admins/:id',
  Insert      = '/api/user/admins',
  Update      = '/api/user/admins/:id'
}

export enum ECourierRoute {
  Get     = '/api/user/couriers',
  GetById = '/api/user/couriers/:id',
  Insert  = '/api/user/couriers',
  Update  = '/api/user/couriers/:id'
  // SetWorkingDay   = '/api/user/couriers/set-working-day'
}

export enum ECustomersRoute {
  GetById = '/api/user/customers/:id',
  Get     = '/api/user/customers',
  Insert  = '/api/user/customers',
  Update  = '/api/user/customers/:id'
}
