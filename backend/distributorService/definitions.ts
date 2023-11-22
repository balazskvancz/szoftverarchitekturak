/* eslint-disable no-shadow */

export {
  EBindValue,
  HEADQUARTERS_GEO_DETAILS
} from '@backend/definitions'

export type {
  IUser,
  IConfig,
  IDigestPackage,
  IDatabaseConfig,
  TDigestPackages,
  IAddressGeoDetails,
  TPackageLifeCycleAction
} from '@common/definitions'

import type {
  IDigestPackage,
  TPackageLifeCycleAction
} from '@common/definitions'

export interface IBasePackageDistribution {
  readonly packageId: number
  readonly courierId: number
  readonly action: TPackageLifeCycleAction
}

export interface IPackageDistribution extends IBasePackageDistribution {
  readonly id: number
  readonly doneAt: string | null
  readonly createdAt: string
}

export type TPackageDistributions = readonly IPackageDistribution[]

export interface INextJob {
  readonly package: IDigestPackage
  readonly action: TPackageLifeCycleAction
}

export interface IGetNextJobResponse {
  readonly nextJob: INextJob | null
}

export const JOB_RESULTS = [ 'success', 'fail' ] as const

export type TJobResult = typeof JOB_RESULTS[number]

export interface ISetJobDoneRequest {
  readonly result: TJobResult
}

type TNextAction = Record<TPackageLifeCycleAction, TPackageLifeCycleAction>

export const NEXT_ACTIONS_ON_RESULT: Record<TJobResult, TNextAction> = {
  fail: {
    created:        'created',
    delivered:      'delivered',
    movedToCenter:  'movedToCenter',

    // Nekünk csak ennek az alsó háromnak van jelentősége.
    onDelivery:     'movedToCenter',
    pickedUp:       'created',
    sentBack:       'sentBack'
  },
  success: {
    created:        'created',
    delivered:      'delivered',
    movedToCenter:  'delivered',

    // Szintén csak ennek a háromnak van jelentősége.
    onDelivery:     'delivered',
    pickedUp:       'movedToCenter',
    sentBack:       'sentBack'
  }
}

export enum EJobsRoute {
  GetNextJob = '/api/distributor/jobs/get-next',
  SetJobDone = '/api/distributor/jobs/:id'
}
