/* eslint-disable no-shadow */
export type {
  IConfig,
  IDatabaseConfig
} from '@common/definitions'

/** Címek. */
export interface IBaseAddress {
  readonly userId: number
  readonly country: string
  readonly postalCode: string
  readonly city: string
  readonly street: string
  readonly house: string
}

export interface IAddress extends IBaseAddress {
  readonly id: number
  readonly createdAt: string
}

export type TAddresses = readonly IAddress[]

export interface IGetAddressByIdResponse {
  readonly address: IAddress | null
}

/** Csomag dimenziók. */
export interface IBaseDimension {
  readonly length: number
  readonly depth: number
  readonly width: number
}

export interface IDimension extends IBaseDimension {
  readonly id: number
  readonly createdAt: string
}

export type TDimensions = readonly IDimension[]

export interface IGetAllDimensionsResponse {
  readonly dimensions: TDimensions
}

export interface IGetDimensionByIdResponse {
  readonly dimension: IDimension | null
}

/** Csomagok. */
export interface IBasePackage {
  readonly senderId: number
  readonly pickUpAddressId: number
  readonly destAddressId: number
  readonly dimensionId: number
  readonly weight: number
  readonly expectedDelivery: string | null
  readonly suitableReceipt: string | null
}

export interface IPackage extends IBaseAddress {
  readonly id: number
  readonly qrcode: string
  readonly createdAt: string
}

/** Csomag életciklus események. */
export const PACKAGE_LIFECYCLES = [
  // TODO: bővíteni...
  'created'
] as const

export type TPackageLifecyclceAction = typeof PACKAGE_LIFECYCLES[number]

export interface IBasePackageLifecycle {
  readonly packageId: number
  readonly userId: number
  readonly action: TPackageLifecyclceAction
}

export interface IPackageLifecycle extends IBasePackageLifecycle {
  readonly id: number
  readonly createdAt: string
}

export type TPackageLifecycles = readonly IPackageLifecycle[]

export enum EDimensionsRoute {
  GetAll  = '/api/package/dimensions',
  GetById = '/api/package/dimensions/:id',
  Insert  = '/api/package/dimensions',
  Update  = '/api/package/dimensions/:id'
}

export enum EAddressesRoute {
  GetById = '/api/package/addresses/:id',
  Insert  = '/api/package/addresses'
}

export enum EPackagesRoute {
  Insert = '/api/package/packages'
}
