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

export enum EDimensionsRoute {
  DeleteById  = '/api/package/dimensions/:id',
  GetAll      = '/api/package/dimensions',
  GetById     = '/api/package/dimensions/:id',
  Insert      = '/api/package/dimensions',
  Update      = '/api/package/dimensions/:id'
}

export enum EAddressesRoute {
  GetById = '/api/package/addresses/:id',
  Insert  = '/api/package/addresses'
}

export enum EPackagesRoute {
  Insert        = '/api/package/packages',
  GetLifeCycles = '/api/package/packages/:id/life-cycles'
}

export enum EPackageLifeCyclesRoute {
  Insert = '/api/package/package-life-cycles'
}
