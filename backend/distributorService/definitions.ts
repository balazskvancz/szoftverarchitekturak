/* eslint-disable no-shadow */

export { EBindValue  } from '@backend/definitions'

export type {
  IUser,
  IConfig,
  IDatabaseConfig,
  TPackageLifeCycleAction
} from '@common/definitions'

import type {
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

export interface IGetNextJobResponse {
  readonly nextJob: IPackageDistribution | null
}

export enum EJobsRoute {
  GetNextJob = '/api/distributor/jobs/get-next'
}
