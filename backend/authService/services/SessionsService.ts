import BaseService from '@common/backend/BaseService'
import type { ISession } from '../definitions'

// import { EUserRole } from '../definitions'
// import type { IUser, IInsertUser } from '../definitions'

export default class SessionsService extends BaseService {
  /**
   * Beszúr egy session rekordot.
   * @param hash    - LoginHash.
   * @param userId  - Felhasználó azonosító.
   * @returns       boolean a beszúrás sikerességéről.
   */
  public async insert (hash: string, userId: number): Promise<boolean> {
    const result = await this.db.exec(`
      INSERT INTO ${ this.tableName } SET
        loginHash  = ?,
        userId     = ?,
        startedAt  = NOW()
    `, [ hash, userId ])

    return this.db.hasAffectedRows(result)
  }

  /**
   * Soft töröl egy sessiont hash alapján.
   * @param hash - LoginHash.
   * @returns    boolean törlésről sikerességéről.
   */
  public async delete (hash: string): Promise<boolean> {
    const result = await this.db.exec(`
      UPDATE ${ this.tableName }
      SET endedAt = NOW()
      WHERE loginHash = ?
    `, [ hash ])

    return this.db.hasAffectedRows(result)
  }

  /**
   * Lekérdezi az élő session adatait hash alapján. Ha a sessiont korábban lezárták nem adja vissza a rekordot.
   * Note: az a megfontolás, hogy kliens oldalról nem lenne szabad lezárt sessionökre hivatkozni, így ez csak valami hiba esetén fordulhat elő ezért hibát dobunk.
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
