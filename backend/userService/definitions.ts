/* eslint-disable no-shadow */

import type {
  TAddresses
} from '@common/definitions'

export type {
  IConfig,
  IDatabaseConfig
} from '@common/definitions'

export {
  LOGIN_HASH_COOKIE_NAME
} from '@common/definitions'

export {
  EBindValue
} from '../definitions'

export type {
  IInsertAddressRequest
} from '../definitions'

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

export interface IUserRole {
  readonly role: TUserType
}

export interface IInsertUser extends IInsertUserRequest, IUserRole {}

export interface IUser extends IBaseUser, IUserRole {
  readonly id: number
  readonly createdAt: string
}

export type TUsers = readonly IUser[]

export interface IGetUserByIdResponse {
  readonly user: IUser | null
}

export interface IAdmin extends IUser {}

export type TAdmins = readonly IAdmin[]

export interface IBaseCourier extends IBaseUser {
  readonly telephone: string
}

export interface IInsertCourier extends IBaseCourier, IPassword {}

export interface IGetUserResponse {
  readonly user: IUser | null
}

export interface IGetAllAdminsResponse {
  readonly admins: TAdmins
}

export interface IGetAdminByIdResponse {
  readonly admin: IAdmin | null
}

export interface ICourier extends IUser {
  readonly telephone: string
}

export type TCouriers = readonly ICourier[]

export interface IGetCourierByIdResponse {
  readonly courier: ICourier | null
}

export interface IGetAllCouriersResponse {
  readonly couriers: TCouriers
}

export interface IGetCurrentlyWorkingCouriersResponse extends IGetAllCouriersResponse {}

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

/** Futár munkanapok. */
export interface ISetWorkingDaysRequest {
  readonly dates: string[]
}

export interface IBaseCourierWorkingDay {
  readonly userId: number
  readonly day: string
}

export interface ICourierWorkingDay extends IBaseCourierWorkingDay {
  readonly id: number
  readonly createdAt: string
}

export type TCourierWorkingDays = readonly ICourierWorkingDay[]

export interface IGetCourierWorkingDaysResponse {
  readonly workingDays: TCourierWorkingDays
}

export interface ICourierCalendarDay {
  readonly date: string
  readonly isSetForWorking: boolean
}

export type TCourierCalendarWeek = readonly ICourierCalendarDay[]

export interface IGetCourierCalendarResponse {
  readonly calendarWeeks: TCourierCalendarWeek[]
}

/** Felhasználó - címek. */
export interface IBaseCustomerAddress {
  readonly userId: number
  readonly addressId: number
}

export interface ICustomerAddress extends IBaseCustomerAddress {
  readonly createdAt: string
}

export type TCustomerAddresses = readonly ICustomerAddress[]

export interface IGetAllAddresses {
  readonly addresses: TAddresses
}

export enum EUsersRoute {
  ChangePassword          = '/api/user/users/change-password',
  DeleteById              = '/api/user/users/:id',
  GetAll                  = '/api/user/users/get-all',
  GetUserById             = '/api/user/users/by-id/:id',
  GetByEmailAndPassword   = '/api/user/users/by-email-and-password'
}

export enum EAdminsRoute {
  Get         = '/api/user/admins',
  GetById     = '/api/user/admins/:id',
  Insert      = '/api/user/admins',
  Update      = '/api/user/admins/:id'
}

export enum ECourierRoute {
  Get                   = '/api/user/couriers/all',
  GetById               = '/api/user/couriers/by-id/:id',
  GetCurrentlyWorking   = '/api/user/couriers/currently-working',
  Insert                = '/api/user/couriers',
  IsWorkingDay          = '/api/user/couriers/is-working-day',
  Update                = '/api/user/couriers/:id'
}

export enum ECourierWorkingDaysRoute {
  GetCalendar = '/api/user/courier-working-days/calendar',
  Set         = '/api/user/courier/working-days/set'
}

export enum ECustomersRoute {
  GetById         = '/api/user/customers/:id',
  Get             = '/api/user/customers',
  Insert          = '/api/user/customers',
  Update          = '/api/user/customers/:id'
}

export enum ECustomerAddressesRoute {
  DeleteById  = '/api/user/customer-addresses/:addressId',
  Get         = '/api/user/customer-addresses',
  Insert      = '/api/user/customer-addresses'
}
