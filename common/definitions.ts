interface IHttpConfig {
  readonly host: string
  readonly port: number
}

export interface IDatabaseConfig {
  readonly host: string
  readonly port: number
  readonly user: string
  readonly password: string
  readonly database: string
}

export interface IConfig {
  readonly http: IHttpConfig
  readonly db: IDatabaseConfig
}

export interface IFormError {
  readonly key: string
  readonly message: string
}

export type TFormErrors = readonly IFormError[]

export interface IGeneralError {
  readonly code: number
  readonly message?: string
  readonly formErrors?: TFormErrors
}

export interface IError {
  readonly code: number
  readonly message: string
}

export interface IAjaxResponse<T extends TAnyObject> {
  readonly error: IGeneralError | null
  readonly data: T
}

export interface ICreateError {
  readonly formErrors?: readonly IFormError[]
  readonly error?: IError
}

export interface ICreateResource extends ICreateError {
  readonly insertedId: number
}

export interface IUpdateResource extends ICreateError {
  readonly isUpdated: boolean
}

export interface IInsertedIdResponse {
  readonly insertedId: number
}

export interface IPaginationParams {
  readonly page: number
  readonly limit: number
}

export interface IMetaData extends IPaginationParams {
  readonly totalCount: number
}

export interface IDataResponse<T extends TAnyObject> {
  readonly data: T
  readonly metaData: IMetaData
}

/** Szervíz specifikus típusok. */
export type {
  IDimension,
  TDimensions,
  IBaseDimension,
  IGetDimensionByIdResponse,
  IGetAllDimensionsResponse
} from '../backend/packageService/definitions'

export {
  EDimensionsRoute
} from '../backend/packageService/definitions'

/** UserService. */

export type {
  IAdmin,
  TAdmins,
  ICourier,
  IBaseUser,
  ICustomer,
  TCouriers,
  TCustomers,
  IBaseCustomer,
  IInsertCustomer,
  IInsertUserRequest,
  IGetAdminByIdResponse,
  IGetAllAdminsResponse,
  IGetAllCustomersResponse,
  IGetCustomerByIdResponse
} from '../backend/userService/definitions'

export {
  EUsersRoute,
  EAdminsRoute,
  ECourierRoute,
  ECustomersRoute
} from '../backend/userService/definitions'
