/* eslint-disable no-shadow */
export type {
  IConfig,
  IDatabaseConfig,
  IInsertedIdResponse
} from '@common/definitions'

export {
  EBindValue
} from '../definitions'

export type {
  IUser
} from '../definitions'

/** Címek. */
export interface IBaseAddress {
  readonly userId: number
  readonly country: string
  readonly postalCode: string
  readonly city: string
  readonly street: string
  readonly house: string
}

export interface IInsertAddressRequest extends IBaseAddress {}

export interface IInsertAddress extends IBaseAddress {
  readonly longitude: number
  readonly latitude: number
}

export interface IAddress extends IBaseAddress {
  readonly id: number
  readonly createdAt: string
}

export type TAddresses = readonly IAddress[]

export interface IGetAddressByIdResponse {
  readonly address: IAddress | null
}

export interface IGetAddressesByIdsRequest {
  readonly ids: number[]
}

export interface IGetAddressesByIdsResponse {
  readonly addresses: TAddresses
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

/** Csomag életciklus események. */
export const PACKAGE_LIFECYCLES = [
  'created',
  'pickedUp',
  'movedToCenter',
  'onDelivery',
  'sentBack',
  'delivered'
] as const

export type TPackageLifeCycleAction = typeof PACKAGE_LIFECYCLES[number]

/**
 * Számontartja, hogy egy adott állapotból milyen más állapotokba térhetünk át.
 * Olyasmi, mint egy állapotátmeneti függvény az automatáknál.
 */
export const VALID_NEXT_ACTIONS: Record<TPackageLifeCycleAction, TPackageLifeCycleAction[]> = {
  /** A csomag létrehozása. */
  created: [ 'pickedUp' ],

  /** A csomag feladótól való felvétele. */
  pickedUp: [ 'movedToCenter', 'onDelivery', 'delivered', 'sentBack' ],

  /** Központi lerakatba szállítva. */
  movedToCenter: [ 'onDelivery', 'sentBack', 'delivered' ],

  /** Kiszállítás alatt. */
  onDelivery: [ 'movedToCenter', 'sentBack', 'delivered' ],

  /** Visszaküldve. */
  sentBack: [ 'sentBack' ],

  /** Végső állapot, kiszállításra került a csomag. */
  delivered: [ 'delivered' ]
}

export interface IInsertPackageLifeCycleRequest {
  readonly packageId: number
  readonly action: TPackageLifeCycleAction
}

export interface IBasePackageLifeCycle extends IInsertPackageLifeCycleRequest {
  readonly userId: number
}

export interface IPackageLifeCycle extends IBasePackageLifeCycle {
  readonly id: number
  readonly createdAt: string
}

export type TPackageLifeCycles = readonly IPackageLifeCycle[]

export interface IGetPackageLifeCyclesResponse {
  readonly lifeCycles: TPackageLifeCycles
}

/** Csomagok. */
export interface IBasePackage {
  readonly pickUpAddressId: number
  readonly dimensionId: number
  readonly weight: number
  readonly receiverEmail: string
  readonly receiverName: string
}

export interface IInsertPackageRequest extends IBasePackage {
  readonly dest: IBaseAddress
}

export interface IInsertPackage extends IBasePackage {
  readonly destAddressId: number
  readonly senderId: number
}

export interface IPackage extends IInsertPackage, IBaseDimension {
  readonly id: number
  readonly qrcode: string
  readonly createdAt: string
}

export type TPackages = readonly IPackage[]

export interface IDigestPackage extends IPackage {
  readonly lifeCycles: TPackageLifeCycles
  readonly destAddress: IAddress | null
}

export type TDigestPackages = readonly IDigestPackage[]

export interface IGetPackageByIdResponse {
  readonly digestPackage: IDigestPackage
}

export interface IGetDigestPackages {
  readonly digestPackages: TDigestPackages
}

export interface IGetActionablePackagesResponse {
  readonly packagesForDelivery: TDigestPackages
  readonly packagesForPickUp: TDigestPackages
}

export enum EDimensionsRoute {
  DeleteById  = '/api/package/dimensions/:id',
  GetAll      = '/api/package/dimensions',
  GetById     = '/api/package/dimensions/:id',
  Insert      = '/api/package/dimensions',
  Update      = '/api/package/dimensions/:id'
}

export enum EAddressesRoute {
  GetById   = '/api/package/addresses/:id',
  GetByIds  = '/api/package/addresses/by-ids',
  Insert    = '/api/package/addresses'
}

export enum EPackagesRoute {
  Get           = '/api/package/packages',
  GetById       = '/api/package/packages/by-id/:id',
  GetActionable = '/api/package/packages/actionable',
  Insert        = '/api/package/packages',
  GetLifeCycles = '/api/package/packages/:id/life-cycles'
}

export enum EPackageLifeCyclesRoute {
  Insert = '/api/package/package-life-cycles'
}
