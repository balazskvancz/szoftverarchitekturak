export interface IDateParts {
  readonly needYear: boolean
  readonly needMonth: boolean
  readonly needDay: boolean
}

export interface ITimeParts {
  readonly needHours: boolean
  readonly needMinutes: boolean
  readonly needSeconds: boolean
}

export const TEN                      = 10
export const HOUR_PER_DAY             = 24
export const MINUTES_PER_HOUR         = 60
export const SECONDS_PER_MINUTE       = 60
export const MILLISECONDS_PER_SECOND  = 1000
