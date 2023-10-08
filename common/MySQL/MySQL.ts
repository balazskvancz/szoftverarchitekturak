/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-explicit-any */

/** @see {@link https://github.com/mysqljs/mysql} */
import mysql from 'mysql'

import Logger     from '@common/Logger/Logger'
import Validator  from '@common/Validator/Validator'

import { SECOND_IN_MILLISECONDS } from './definitions'

import type {
  TValues,
  TResults,
  TMYSQLParam,
  IMYSQLMethods
} from './definitions'

const WAIT_BETWEEN_EACH_RECONNECT_TRYING = 1000 // ms
const MAX_RECONNECT_TRYING = 5

const log = new Logger('MYSQL')

export default class MySql implements IMYSQLMethods {
  private readonly props: mysql.ConnectionConfig
  private actualReconnectCount: number
  private keepAliveTime: number
  private connection: mysql.Connection | null
  private connectionLostDetectionId: NodeJS.Timeout  | null
  private keepAliveId: NodeJS.Timeout | null

  public constructor (props: TMYSQLParam) {
    // A bind-ek a legtetejére!
    // ------------------------
    this.handleError      = this.handleError.bind(this)
    this.tryToReconnect   = this.tryToReconnect.bind(this)
    this.incKeepAliveTime = this.incKeepAliveTime.bind(this)
    this.makeConnection   = this.makeConnection.bind(this)
    this.connect          = this.connect.bind(this)

    this.props = {
      ...props,
      dateStrings: true,
      supportBigNumbers: true,
      multipleStatements: false
    }

    this.actualReconnectCount       = 0
    this.connection                 = null
    this.connectionLostDetectionId  = null
    this.keepAliveId                = null
    this.keepAliveTime              = 0
  }

  /** Megpróbálunk újra csatlakozni az adatbázishoz. */
  public tryToReconnect (): boolean {
    log.warning(`[TRY TO RECONNECT] Újracsatlakozási lehetőségek száma: ${ MAX_RECONNECT_TRYING - this.actualReconnectCount }`)

    if (this.actualReconnectCount >= MAX_RECONNECT_TRYING) {
      return false
    }

    this.actualReconnectCount++

    const waitBeforeReconnect = WAIT_BETWEEN_EACH_RECONNECT_TRYING * this.actualReconnectCount

    log.info(`Újracsatlakozás ${ waitBeforeReconnect / SECOND_IN_MILLISECONDS } másodperc múlva.`)

    this.connectionLostDetectionId = setTimeout(this.connect, waitBeforeReconnect)

    return true
  }

  /** Csatlakozva vagyunk az adatbázishoz? */
  public isConnected (): boolean {
    return !Validator.isNull(this.connection)
  }

  /**
   * Egy bármilyen query küldése az adatbázisnak.
   * Promise-alapú.
   * @param sql - Az sql, amit futtatni szeretnénk.
   * @param values - A behelyettesítendő értékek - ha vannak.
   */
  public query <T = any> (sql: string, values: TValues = []): Promise<T> {
    return new Promise((resolve, reject) => {
      if (!this.connection) {
        reject(new Error('Nincs létrehozva kapcsolat!'))

        return
      }

      this.connection.query(sql, values, (err, results) => {
        if (err) {
          reject(err)

          return
        }

        resolve(results)
      })
    })
  }

  /**
   * A query függvény aliasa.
   * @param sql - Az sql, amit futtatni szeretnénk.
   * @param values - A behelyettesítendő értékek - ha vannak.
   */
  public exec <T = any> (sql: string, values: TValues = []): Promise<T> {
    return this.query(sql, values)
  }

  /**
   * Egy query futtatásának eredménye, tömbként.
   * @param sql - Az sql, amit futtatni szeretnénk.
   * @param values - A behelyettesítendő értékek - ha vannak.
   */
  public async getArray <T = any> (sql: string, values: TValues = []): Promise<T> {
    const res = await this.exec(sql, values)

    if (res) {
      return res
    }

    // @ts-expect-error T extends Array<Object> tehát tömböt kell visszaadni
    return []
  }

  /**
   * Query alapján egyetlen válasz object vagy null.
   * @param sql - Az sql, amit futtatni szeretnénk.
   * @param values - A behelyettesítendő értékek - ha vannak.
   */
  public async getRow <T = any> (sql: string, values: TValues = []): Promise<T | null> {
    const res = await this.exec(sql, values)

    const row = Validator.isNonEmptyArray<T>(res) && res.length > 0 ? res[0] : null

    return row
  }

  /**
   * Megvárja a futó query-ket, hogy befejeződjenek.
   * Ez a biztonságosabb a destroy-al ellentétben.
   * @url https://github.com/mysqljs/mysql#terminating-connections
   */
  public end (): Promise<void> {
    return new Promise((resolve, reject) => {
      this.clearTimeouts()

      if (!this.connection) {
        resolve()

        return
      }

      this.connection.end((err) => {
        if (err) {
          log.error(`[end] error: ${ err.stack }`)

          reject(err)

          return
        }

        log.info('[end] kapcsolat bontva.')
        resolve()
      })
    })
  }

  /** A kapcsolat AZONNALI elpusztítása. Ha voltak közben futó query-k, akkor ez van. :| */
  public destroy (): void {
    this.clearTimeouts()

    if (this.connection) {
      this.connection.destroy()
    }

    log.info('[destroy] kapcsolat bontva.')
  }

  /**
   * Az érintett sorok száma INSERT, UPDATE és DELETE statement esetén.
   * @param results - Az adatbázisművelet után visszakapott érték.
   */
  public getAffectedRows (results: TResults): number {
    const affectedRows = (
      Validator.isObject(results) &&
      Validator.isObjectHaveKeys(results, [ 'affectedRows' ]) &&
      Validator.isNumber(results.affectedRows)
    )
      ? results.affectedRows
      : 0

    return affectedRows
  }

  /**
   * A módosult sorok száma UPDATE statement esetén.
   * @param results - Az adatbázisművelet után visszakapott érték.
   * @see {@link https://github.com/mysqljs/mysql#getting-the-number-of-affected-rows}
   */
  public getChangedRows (results: TResults): number {
    const changedRows = (
      Validator.isObject(results) &&
      Validator.isObjectHaveKeys(results, [ 'changedRows' ]) &&
      Validator.isNumber(results.changedRows)
    )
      ? results.changedRows
      : 0

    return changedRows
  }

  /**
   * Volt érintett sor az adatbázisművelet után?
   * INSERT, UPDATE vagy DELETE esetén.
   * @param results - Az adatbázisművelet után visszakapott érték.
   */
  public hasAffectedRows (results: TResults): boolean {
    return this.getAffectedRows(results) > 0
  }

  /**
   * Volt módosult sor az adatbázisművelet után?
   * UPDATE művelete esetén.
   * @param results - Az adatbázisművelet után visszakapott érték.
   */
  public hasChangedRows (results: TResults): boolean {
    return this.getChangedRows(results) > 0
  }

  /**
   * Újonnan beszúrt adatbázis mező inkrementális ID-ját adja vissza.
   * @see {@link https://github.com/mysqljs/mysql#getting-the-id-of-an-inserted-row}
   * @param results - A db visszatérési értéke, amiből próbáljuk kiszedni az insertId-t.
   */
  public insertId (results: TResults): number {
    const insertId = (
      Validator.isObject(results) &&
      Validator.isObjectHaveKeys(results, [ 'insertId' ]) &&
      Validator.isNumber(results.insertId)
    )
      ? results.insertId
      : 0

    return insertId
  }

  /**
   * Egy nem megbízható szöveg escapelése.
   * @param untrusted - A nem megbízható szöveg.
   */
  public escape (untrusted: string): string {
    return mysql.escape(untrusted)
  }

  /**
   * Úgy escapel, hogy a quote-okat leveszi róla.
   * Erre LIKE '%${ untrusted }%' esetén van szükségünk.
   * @param untrusted - A nem megbízható szöveg.
   */
  public unQuotedEscape (untrusted: string | number): string {
    return mysql.escape(untrusted).replace(/'/g, '')
  }

  /**
   * Egy sztring tömböt alakít át olyan formára, hogy valid legyen
   * SQL `IN` operátor után.
   * @param array - A bejövő tömb.
   */
  public makeInString (array: (string | number)[]): string {
    const quotedStringList = array.map((value) => {
      const escaped = this.unQuotedEscape(value)

      return `"${ escaped }"`
    })

    return quotedStringList.join(', ')
  }

  /** A kapcsolat létrejöttének vizsgálata. */
  public connect (): Promise<void> {
    this.connection = this.makeConnection()

    this.keepAliveTime = 0

    this.keepAliveId = setInterval(this.incKeepAliveTime, SECOND_IN_MILLISECONDS)

    return new Promise((resolve, reject) => {
      if (!this.connection) {
        reject(new Error('Nincs létrehozva kapcsolat!'))

        return
      }

      this.connection.connect((err) => {
        if (err) {
          this.handleError(err)

          return
        }

        this.actualReconnectCount = 0
        this.keepAliveTime = 0

        log.info('[connect] sikeres csatlakozás!')
        log.info(`[connect] Szálazonosító: ${ this.connection?.threadId }, ekkor: ${ (new Date()).toISOString() }`)

        resolve()
      })
    })
  }

  /** Megnöveli a "keepAlive" időt. */
  private incKeepAliveTime (): void {
    this.keepAliveTime = this.keepAliveTime + SECOND_IN_MILLISECONDS
  }

  /** Létrehoz egy új kapcsolatot, de nem csatlakozik még rá. Valamint feliratkozik a hibaeseményre. */
  private makeConnection (): mysql.Connection {
    const connection = mysql.createConnection(this.props)

    connection.on('error', this.handleError)

    return connection
  }

  /**
   * Bármilyen hiba, amit vagy nodejs vagy mysql dob, ide fut.
   * @param {mysql.MysqlError} err - A dobott hiba.
   * @private
   */
  private handleError (err: mysql.MysqlError): void {
    // Ha alapból nem sikerült csatlakozni.
    if (err.code === 'ECONNREFUSED') {
      log.error(`[${ err.code }] Nem sikerült csatlakozni az adatbázishoz!`)
    }
    // Ha valamiért dobta a kapcsolatot.
    else if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      log.error(`
        [${ err.code }]
        A kapcsolat megszakadt ${ this.keepAliveTime / SECOND_IN_MILLISECONDS } másodperc után, ekkor: ${ (new Date()).toISOString() }
      `)
    }
    // Bármi más, amivel még nem foglalkozunk.
    else {
      log.error(`[${ err.code }] ${ err.message }`)
    }

    if (!this.tryToReconnect()) {
      throw err
    }
  }

  private clearTimeouts (): void {
    if (this.connectionLostDetectionId) {
      clearTimeout(this.connectionLostDetectionId)
    }

    if (this.keepAliveId) {
      clearInterval(this.keepAliveId)
    }
  }
}
