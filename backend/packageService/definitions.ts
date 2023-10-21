export type {
  IConfig,
  IDatabaseConfig
} from '@common/definitions'

/* eslint-disable no-shadow */
export enum EExampleResourcesRoute {
  Todo = '/api/package/todo'
}

/** Címek. */
export interface IBaseAddress {
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
