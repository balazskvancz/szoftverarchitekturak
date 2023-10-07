import BaseService from '@common/backend/BaseService'

import type { IUser, IInsertUser } from '../definitions'

export default class UsersService extends BaseService {
  /**
   * Egy új felhasználó beszúrása.
   * @param insertData - A beszúrandó adat.
   */
  public async insert (insertData: IInsertUser): Promise<number> {
    const result = await this.db.exec(`
      INSERT INTO ${ this.tableName } SET
        name      = ?,
        email     = ?,
        password  = ?,
        createdAt = NOW()
    `, [ insertData.name, insertData.email, insertData.password ])

    return this.db.insertId(result)
  }

  /** Lekérdezi az összes felhasználót. */
  public getAllUsers (): Promise<IUser[]> {
    return this.db.getArray(`
      ${ this.getBaseSql() }
      WHERE deletedAt IS NULL
    `)
  }

  /**
   * Lekérdez egy felhasználót azonosító szerint.
   * @param id - A keresendő azonosító.
   */
  public getUserById (id: number): Promise<IUser | null> {
    return this.db.getRow(`
      ${ this.getBaseSql() }
      WHERE deletedAt IS NULL
      AND id = ?
    `, [ id ])
  }

  /** Alap SQL lekérdezés. */
  private getBaseSql (): string {
    return `
      SELECT
        id,
        name,
        email,
        createdAt
      FROM ${ this.tableName }
    `
  }
}
