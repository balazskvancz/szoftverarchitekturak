import BaseService from '@common/backend/BaseService'

import type { ICourier, TCouriers } from '../definitions'

export default class CouriersService extends BaseService {
  /**
   * Egy új futár beszúrása.
   * @param id        - A futár azonosítója.
   * @param phoneNum  - A futár telefonszáma.
   */
  public async insert (id: number, phoneNum: string): Promise<boolean> {
    const result = await this.db.exec(`
    INSERT INTO ${ this.tableName } SET
      userId    = ?,
      phoneNum  = ?
  `, [ id, phoneNum ])

    return this.db.hasAffectedRows(result)
  }

  /**
   * Egy futár módosítása.
   * @param id        - A futár azonosítója.
   * @param phoneNum  - A futár telefonszáma.
   */
  public async update (id: number, phoneNum: string): Promise<boolean> {
    const result = await this.db.exec(`
    UPDATE ${ this.tableName } SET
      phoneNum    = ?
    WHERE userId  = ?
  `, [ phoneNum, id ])

    return this.db.hasAffectedRows(result)
  }

  /**
   * Egy adott futár adatainak elkérése.
   * @param id - Azonosító.
   */
  public getById (id: number): Promise<ICourier | null> {
    return this.db.getRow(`
      ${ this.getBaseSql() }
      AND c.userId = ?
    `, [ id ])
  }

  /** Összes felvett futár lekérderdezése. */
  public getAll (): Promise<TCouriers> {
    return this.db.getArray(this.getBaseSql())
  }

  /** Alap SQL lekérdezés. */
  private getBaseSql (): string {
    return `
      SELECT
        u.id,
        u.name,
        u.email,
        u.role,
        u.createdAt,

        c.phoneNum
      FROM ${ this.tableName } AS c
      INNER JOIN users AS u ON c.userId = u.id
      WHERE u.deletedAt IS NULL
    `
  }
}
