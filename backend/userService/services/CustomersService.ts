import BaseService from '@common/backend/BaseService'

import type { ICustomer, TCustomers } from '../definitions'

export default class CustomersService extends BaseService {
/**
 * Egy új ügyfél beszúrása.
 * @param id - Az ügyfél azonosítója.
 * @param telephone - Az ügyfél telefonszáma.
 */
  public async insert (id: number, telephone: string): Promise<boolean> {
    const result = await this.db.exec(`
    INSERT INTO ${ this.tableName } SET
      userId   = ?,
      telephone = ?
  `, [ id, telephone ])

    return this.db.hasAffectedRows(result)
  }

  /**
   * Egy ügyfél módosítása.
   * @param id        - A futár azonosítója.
   * @param telephone  - A futár telefonszáma.
   */
  public async update (id: number, telephone: string): Promise<boolean> {
    const result = await this.db.exec(`
    UPDATE ${ this.tableName } SET
      telephone    = ?
    WHERE userId  = ?
  `, [ telephone, id ])

    return this.db.hasAffectedRows(result)
  }

  /**
   * Egy adott futár adatainak elkérése.
   * @param id - Azonosító.
   */
  public getById (id: number): Promise<ICustomer | null> {
    return this.db.getRow(`
      ${ this.getBaseSql() }
      AND c.userId = ?
    `, [ id ])
  }

  /** Összes felvett futár lekérderdezése. */
  public getAll (): Promise<TCustomers> {
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

        c.telephone
      FROM ${ this.tableName } AS c
      INNER JOIN users AS u ON c.userId = u.id
      WHERE u.deletedAt IS NULL
    `
  }
}
