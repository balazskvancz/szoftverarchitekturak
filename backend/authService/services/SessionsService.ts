import BaseService from '@common/backend/BaseService'

import type { ISession, IBaseSession } from '../definitions'

export default class SessionsService extends BaseService {
  /**
   * Beszúr egy session egyedet.
   * @param data - A beszúrandó adat.
   */
  public async insert (data: IBaseSession): Promise<boolean> {
    const result = await this.db.exec(`
      INSERT INTO ${ this.tableName } SET
        loginHash  = ?,
        userId     = ?,
        startedAt  = NOW()
    `, [ data.loginHash, data.userId ])

    return this.db.hasAffectedRows(result)
  }

  /**
   * Beállítja a lejárati dátumot egy adott egyednél.
   * @param hash - LoginHash.
   */
  public async setEndedAt (hash: string): Promise<boolean> {
    const result = await this.db.exec(`
      UPDATE ${ this.tableName } SET
        endedAt = NOW()
      WHERE loginHash = ?
    `, [ hash ])

    return this.db.hasAffectedRows(result)
  }

  /**
   * Lekérdezi egy élő session adatait azonosító szerint.
   * @param hash  - LoginHash.
   * */
  public getByHash (hash: string): Promise<ISession | null> {
    return this.db.getRow(`
      ${ this.getBaseSql() }
      WHERE loginHash = ?
      AND endedAt IS NULL
    `, [ hash ])
  }

  /** Alap SQL lekérdezés. */
  private getBaseSql (): string {
    return `
      SELECT
        loginHash,
        userId,
        startedAt,
        endedAt
      FROM ${ this.tableName }
    `
  }
}
