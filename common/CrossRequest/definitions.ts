export interface ICrossResponse<T extends Object> {
  readonly isSuccess: boolean
  readonly data: T | TAnyObject
}
