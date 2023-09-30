/* eslint-disable @typescript-eslint/no-explicit-any */
export type TValues = (string | number | null)[]

export type TQueryFunction<T = any> = (sql: string, values?: TValues) => Promise<T>

export type TGetArray <T extends readonly Object[] = readonly Object[]> = (sql: string, values?: TValues) => Promise<T>

export type TGetRow <T extends Object = Object> = (sql: string, values?: TValues) => Promise<T | null>

export type TResults = any

type TParamKey = 'host' | 'user' | 'password' | 'database'

export type TMYSQLParam = Record<'port', number> & Record<TParamKey, string>

export interface IMYSQLMethods {
  exec: TQueryFunction
  query: TQueryFunction
  end: TVoidCallback
  destroy: TVoidCallback
  getArray: TGetArray
  getRow: TGetRow
}

export const SECOND_IN_MILLISECONDS = 1000
