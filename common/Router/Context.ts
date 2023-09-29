/* eslint-disable no-restricted-globals */
import type http from 'http'

import type { ServerResponse, IncomingMessage } from 'http'

import type {
  ILogger,
  IWriter,
  IContext,
  IRouteParams,
  IQueryParams,
  IGeneralError,
  TIncomingHeaders,
  TContextBindValue,
  IContextBindingObject
} from './definitions'

import { EHttpStatusCode, JSON_CONTENT_TYPE_HEADER } from './definitions'

import parseQueryParams from './utils/parseQueryParams'
import Validator from './Validator'
import parseCookies from './utils/parseCookies'

const STORAGE_KEYS = [
  'routeParams', 'requestBody', 'bindings'
] as const

type TStorageKey = typeof STORAGE_KEYS[number]

export default class Context implements IContext {
  private readonly req: IncomingMessage
  private readonly res: ServerResponse
  private readonly logger: ILogger | null

  private readonly writer: IWriter

  private readonly storage: Map<TStorageKey, IContextBindingObject>

  public constructor (req: http.IncomingMessage, res: http.ServerResponse, logger: ILogger | null) {
    this.req = req
    this.res = res

    this.logger = logger

    this.storage = new Map<TStorageKey, IContextBindingObject>()

    // Basic beállítás.
    this.writer = {
      statusCode: EHttpStatusCode.StatusOk,
      header: {}
    }
  }

  /** Visszadja a natív bejövő kérést. */
  public getNativeRequest (): http.IncomingMessage {
    return this.req
  }

  /** Visszaadja a beérkező kérés URL-jét. */
  public getUrl (): string {
    return this.req.url ?? ''
  }

  /** Visszaadja a beérkező kérés URL-jét megtisztítva. */
  public getCleanedUrl (): string {
    const url = this.getUrl()

    const queryIndex = url.indexOf('?')

    if (queryIndex === -1) {
      return url
    }

    return url.slice(0, Math.max(0, queryIndex))
  }

  /** Visszaadja a bejövő kérés törzséből kiolvasott és parseolt objectet. */
  public getBody<T> (): T | undefined {
    const b = this.storage.get('requestBody')

    if (Validator.isDefined(b)) {
      return b as T
    }

    return b
  }

  /**
   * Beállítja a kontextushoz tartozó kiolvasott body-t.
   * @param body - A body.
   */
  public setBody (body: TAnyObject): void {
    this.storage.set('requestBody', body)
  }

  /** Visszaadja a bejövő kérés URL-jében található queryParamokat. */
  public getQueryParams <T = IQueryParams> (): T {
    const url = this.getUrl()

    return parseQueryParams(url) as T
  }

  /** Visszaadja a bejövő kéréshez tartozó headert. */
  public getHeader (): TIncomingHeaders {
    return this.req.headers
  }

  /** Visszaadja a bejövő kérés metódusát. */
  public getMethod (): string | undefined {
    return this.req.method?.toLocaleLowerCase()
  }

  /**
   * Visszaadja az adott névvel felvett süti értékét.
   * @param cookieName - Az elkérendő süti neve.
   */
  public getCookie (cookieName: string): string | undefined {
    const cookieStr = this.getHeader().cookie ?? ''
    const cookies = parseCookies(cookieStr)

    return cookies[cookieName]
  }

  /**
   * Beállítja kontextushoz tartozó route paramokat.
   * @param params - A paramok.
   */
  public setRouteParams (params: IRouteParams): void {
    this.storage.set('routeParams', params)
  }

  /** Visszaadja a kontextushoz csatolt route paramokat. */
  public getRouteParams (): IRouteParams {
    const params = this.storage.get('routeParams')

    if (
      !Validator.isDefined(params) ||
      Validator.isNull(params)
    ) {
      return {}
    }

    return params as IRouteParams
  }

  /**
   * Hozzábindol egy értéket a kontextushoz.
   * @param key     - A tárolandó adat kulcsa.
   * @param value   - A tárolandó object.
   */
  public bindValue (key: string, value: TContextBindValue): void {
    const bindings = this.storage.get('bindings') ?? {}

    const newValues = {
      ...bindings,
      [key]: value
    }

    this.storage.set('bindings', newValues)
  }

  /**
   * Visszaad egy adott kulccsal a kontextushoz csatolt objectet.
   * @param key - A keresendő kulcs.
   */
  public getBindedValue <T extends TContextBindValue> (key: string): T | undefined {
    const bindings = this.storage.get('bindings')

    if (!Validator.isDefined(bindings)) {
      return undefined
    }

    if (!Validator.isObjectHaveKeys(bindings, [ key ])) {
      return undefined
    }

    return bindings[key] as T
  }

  /**
   * JSON formátumú válasz írása.
   * @param data - A válaszba írandó adat.
   */
  public sendJson (data: TAnyObject): void {
    this.sendRaw(EHttpStatusCode.StatusOk, data, JSON_CONTENT_TYPE_HEADER)
  }

  /**
   * Generalizált HTTP 400-as hibaküldés.
   * @param err - A küldendő adat.
   */
  public sendError (err: IGeneralError): void {
    this.sendRaw(EHttpStatusCode.StatusBadRequest, err, JSON_CONTENT_TYPE_HEADER)
  }

  /** HTTP 404 hiba küldése. */
  public sendNotFound (): void {
    this.sendRaw(EHttpStatusCode.StatusNotFound)
  }

  /** HTTP 401 hiba küldése. */
  public sendUnauthorized (): void {
    this.sendRaw(EHttpStatusCode.StatusUnauthorized)
  }

  /** Sima OK válasz írása. */
  public sendOk (): void {
    this.sendRaw(EHttpStatusCode.StatusOk)
  }

  /**
   * Válasz írása az író objectnek.
   * @param statusCode  - A válasz státusza.
   * @param data        - Az írandó adat.
   * @param header      - A válaszba írandó fejléc.
   */
  public sendRaw (statusCode: number, data?: TAnyObject, header?: http.OutgoingHttpHeaders): void {
    if (Validator.isDefined(data)) {
      this.write(JSON.stringify(data))
    }

    if (header) {
      this.addHeaders(header)
    }

    this.setStatusCode(statusCode)
  }

  /**
   * Beállítja a válasz státuszkódját.
   * @param statusCode - Az írni kívánt válaszkód.
   */
  public setStatusCode (statusCode: number): void {
    this.writer.statusCode = statusCode
  }

  /**
   * Egy kulcs-érték pár hozzáadása a fejléchez.
   * @param key   - A kulcs.
   * @param value - Az érték.
   */
  public addHeader (key: string, value: string): void {
    this.writer.header[key] = value
  }

  /**
   * Több headers hozzáadása a válaszhoz.
   * @param headers - A hozzáadandó fejlécek.
   */
  public addHeaders (headers: TAnyObject): void {
    this.writer.header = {
      ...this.writer.header,
      ...headers
    }
  }

  /**
   * Nyers adat írása a válaszba.
   * @param data - Az írandó adat.
   */
  public write (data: string): void {
    this.writer.data = data
  }

  /** Tényleges válaszírást megvalósító függvény. */
  public writeToResponse (): void {
    const { data, header, statusCode } = this.writer

    this.res.writeHead(statusCode, header)

    if (Validator.isNonEmptyString(data)) {
      this.res.write(data)
    }

    this.res.end()
  }

  /** Visszaadja a válaszba írt státusz kódját. */
  public getWrittenStatusCode (): number {
    return this.writer.statusCode
  }

  /**
   * Info logger.
   * @param v - Kiírandó szöveg.
   */
  public info (v: string): void {
    if (this.logger) {
      this.logger.info(v)
    }
  }

  /**
   * Error logger.
   * @param v - Kiírandó szöveg.
   */
  public error (v: string): void {
    if (this.logger) {
      this.logger.error(v)
    }
  }

  /**
   * Warning logger.
   * @param v - Kiírandó szöveg.
   */
  public warning (v: string): void {
    if (this.logger) {
      this.logger.warning(v)
    }
  }
}
