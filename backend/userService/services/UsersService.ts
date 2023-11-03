import BaseService from '@common/backend/BaseService'

import type { EUserRole } from '../definitions'
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
        createdAt = NOW(),
        role      = ?
    `, [ insertData.name, insertData.email, insertData.password, insertData.role ])

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
   * Lekérdezi az összes felhasználót jogosultság alapján.
   * @param role - A jogosultság.
   */
  public getUsers (role: EUserRole): Promise<IUser[]> {
    return this.db.getArray(`
    ${ this.getBaseSql() }
    WHERE deletedAt IS NULL
    AND role = ${ role }
    `)
  }

  /**
   * Lekérdez egy felhasználót azonosító szerint.
   * @param id - A keresendő azonosító.
   */
  public getUserById (id: number): Promise<IUser | null> {
    return this.db.getRow(`
        SELECT
          id,
          name,
          email,
          createdAt,
          role
        FROM ${ this.tableName }
        WHERE deletedAt IS NULL
        AND id = ?
      `, [ id ]) // [Simon] kicseréltem a BaseSQL-t role-al kiegészítve mivel hash alapján lekérhetőnek kell lennie. Ezt a függvényt úgy is az authService használja csak (elviekben)
  }

  public getUserIdByEmailPass (email: string, pass: string): Promise<TAnyObject | null> {
    return this.db.getRow(`
        SELECT
        id
        FROM ${ this.tableName }
        WHERE email = ?
        AND password = ?
    `, [ email, pass ])
  }

  /**
   * Lekérdez egy felhasználót jogosultság és id alapján.
   * @param id    - Az id.
   * @param role  - A jogosultság.
   */
  public getUser (id: number, role: EUserRole): Promise<IUser | null> {
    return this.db.getRow(`
      ${ this.getBaseSql() }
      WHERE deletedAt IS NULL
      AND id = ?
      AND role = ?
      `, [ id, role ])
  }

  /**
   * Soft töröl egy felhasználót jogosultság és id alapján.
   * @param id    - Az id.
   * @param role  - A jogosultság.
   */
  public async deleteUser (id: number, role: EUserRole): Promise<boolean> {
    const result = await this.db.exec(`
      UPDATE ${ this.tableName }
      SET deletedAt = NOW()
      WHERE id = ?
      AND role = ${ role }
    `, [ id ])

    return this.db.hasChangedRows(result)
  }

  /**
   * Egy adott azonosítóval rendelkező felhasználó törlését visszaállítja.
   * @param id - Az id.
   */
  public async undoDelete (id: number): Promise<boolean> {
    const result = await this.db.exec(`
      UPDATE ${ this.tableName }
      SET deletedAt = NULL
      WHERE id = ?
      AND deletedAt IS NOT NULL
    `, [ id ])

    return this.db.hasChangedRows(result)
  }

  /**
   * Frissíti egy adott azonosítóval és jogosultsággal rendelkező felhasználó egy adatát.
   * @param id    - A futár azonosítója.
   * @param row   - Melyik adatot kell módosítani.
   * @param data  - Mire kell módosítani.
   * @param role  - A jogosultság.
   */
  public async updateUser (id: number, row: string, data: string, role: EUserRole): Promise<boolean> {
    const result = await this.db.exec(`
      UPDATE ${ this.tableName }
      SET ${ row } = ?
      WHERE deletedAt IS NULL
      AND id = ?
      AND role = ${ role }
    `, [ data, id ])

    return this.db.hasAffectedRows(result)
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
