export const LOG_TYPES = [ 'error', 'info', 'warning' ] as const

export type TLogType = typeof LOG_TYPES[number]

export type TLogCallback = (l: string) => void

export interface ILogger extends Record<TLogType, TLogCallback> { }
