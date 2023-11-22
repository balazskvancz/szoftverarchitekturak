/* eslint-disable no-shadow */

import type {
  IAddressGeoDetails
} from './packageService/definitions'

export interface ICrossRequestOptions {
  readonly host: string
  readonly port: number
  readonly path: string
  readonly method: string

  readonly headers?: TAnyObject // Egyelőre.
}

export type TMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export const GATEWAY_HOST = 'localhost'
export const GATEWAY_PORT = 3000

// BME Q épület lesz a képzeletbeli „főhadiszállásunk”.
// Minden reggel onnan indulnak a futárok és a nap végén oda térnek vissza.
export const HEADQUARTERS_GEO_DETAILS: IAddressGeoDetails = {
  latitude: 47.4734644,
  longitude: 19.0592938
}

export enum EBindValue {
  User = 'user'
}

export {
  LOGIN_HASH_COOKIE_NAME
} from '../common/definitions'

export type {
  IGeneralError,
  IInsertedIdResponse
} from '../common/definitions'

/** AuthService. */
export {
  EAuthRoute
} from './authService/definitions'

export type {
  ISession,
  IDigestSession,
  IGetDigestSessionResponse,
  IGetSessionByHashResponse
} from './authService/definitions'

/** PackageService. */
export {
  EPackagesRoute,
  EAddressesRoute,
  EPackageLifeCyclesRoute
} from './packageService/definitions'

export type {
  TAddresses,
  IDigestPackage,
  IInsertAddressRequest,
  IGetPackageByIdResponse,
  IGetAddressesByIdsRequest,
  IGetAddressesByIdsResponse,
  IInsertPackageLifeCycleRequest,
  IGetActionablePackagesResponse
} from './packageService/definitions'

/** UserService. */
export {
  EUsersRoute,
  ECourierRoute
} from './userService/definitions'

export type {
  IUser,
  TCouriers,
  IGetUserResponse,
  IGetCurrentlyWorkingCouriersResponse
} from './userService/definitions'
