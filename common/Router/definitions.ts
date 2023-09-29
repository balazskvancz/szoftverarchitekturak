import type http from 'http'

export const LOG_TYPES = [ 'error', 'info', 'warning' ] as const

export type TLogType = typeof LOG_TYPES[number]

export type TLogCallback = (l: string) => void

export interface ILogger extends Record<TLogType, TLogCallback> { }

export const SUPPORTED_HTTP_METHODS = [ 'get', 'post', 'head', 'delete', 'put' ] as const

export const METHOD_OPTIONS = 'options'

export enum EHttpStatusCode {
  StatusOk            = 200,
  StatusBadRequest    = 400,
  StatusUnauthorized  = 401,
  StatusNotFound      = 404
}

export interface IFormError {
  readonly key: string
  readonly message: string
}

export type TFormErrors = readonly IFormError[]

export interface IGeneralError {
  readonly code: number
  readonly message?: string
  readonly formErrors?: TFormErrors
}

export interface IError {
  readonly code: number
  readonly message: string
}

export type TSuppoprtedHttpMethod = typeof SUPPORTED_HTTP_METHODS[number]

export const METHODS_WITH_POST_BODY: TSuppoprtedHttpMethod[] = [ 'post', 'put' ]

export type TParamValue = boolean | number | string

export interface ICookieValues {
  readonly [key: string]: string
}

export interface IParams {
  readonly [key: string]: TParamValue | undefined
}

export const JSON_CONTENT_TYPE_HEADER: Record<string, string> = {
  'Content-Type': 'application/json; utf-8'
}

export interface IRouteParams extends IParams {}

export interface IQueryParams extends IParams {}

export interface IWriter {
  statusCode: number
  header: http.OutgoingHttpHeaders
  data?: string
}

export type TContextBindValue = TAnyObject | null | TParamValue | undefined

export interface IContextBindingObject {
  readonly [key: string]: TContextBindValue
}

export type TIncomingHeaders = http.IncomingHttpHeaders

export interface IContext extends ILogger {
  getNativeRequest: () => http.IncomingMessage

  // Bejövő kéréssel kapcsolatos műveletek.
  getUrl: () => string
  getCleanedUrl: () => string

  getBody: <T>() => T | undefined
  setBody: (b: TAnyObject) => void

  getQueryParams: <T = IQueryParams>() => T
  getRouteParams: () => IRouteParams
  setRouteParams: (params: IRouteParams) => void
  getCookie: (cookieName: string) => string | undefined
  getHeader: () => TIncomingHeaders
  getMethod: () => string | undefined

  bindValue: (key: string, value: TContextBindValue) => void
  getBindedValue: <T extends TContextBindValue>(key: string) => T | undefined

  // Válasszal kapcsolatos művelete.
  sendJson: (data: TAnyObject) => void
  sendError: (err: IGeneralError) => void
  sendNotFound: () => void
  sendUnauthorized: () => void
  sendOk: () => void

  setStatusCode: (statusCode: number) => void
  addHeader: (key: string, value: string) => void
  addHeaders: (headers: TAnyObject) => void
  write: (data: string) => void

  getWrittenStatusCode: () => number

  sendRaw: (statusCode: number, data: TAnyObject, header: http.OutgoingHttpHeaders) => void
}

export type TCallbackFunction = (ctx: IContext) => Promise<void>

export type TMiddlewareFunction = (ctx: IContext, next: TCallbackFunction) => Promise<void> | void

export type TValidationFunction = (param: unknown) => IGeneralError | null

/** Route. */
export interface IRoute {
  registerMiddleware: (mw: TMiddlewareFunction) => IRoute
  matchParams: (u: string) => IRouteParams
  getCallback: () => TCallbackFunction
  registerValidation: (fn: TValidationFunction) => IRoute
}

export type TRegisterCallbackFunction = (url: string, fn: TCallbackFunction) => IRoute

// Globális middlewarek.
export type TMatcherFunction = (ctx: IContext) => boolean

export interface IMiddleware {
  doesMatch: TMatcherFunction
  execute: TMiddlewareFunction
}

export type TMiddlewares = IMiddleware[]

export interface IGlobalMiddlewares {
  readonly preRunner: TMiddlewares
  readonly postRunner: TMiddlewares
}

export interface IRouter extends Record<TSuppoprtedHttpMethod, TRegisterCallbackFunction> {
  listen: () => void
  registerMiddleware: (...middlewares: IMiddleware[]) => void
}

// Tree.
export interface ISearchOffset {
  keyOne: number
  keyTwo: number
  isWildcard: boolean
}

export interface IRouterConfig {
  readonly address: number
  readonly hasLogger?: boolean
}
