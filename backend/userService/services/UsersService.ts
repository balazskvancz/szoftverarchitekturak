import BaseService from '@common/backend/BaseService'

import { EUserRole } from '../definitions'
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

  /** Lekérdezi az összes ügyfelet. */
  public getCustomers (): Promise<IUser[]> {
    return this.db.getArray(`
    ${ this.getBaseSql() }
    WHERE deletedAt IS NULL
    AND role = ${ EUserRole.Customer }
    `)
  }

  /** Lekérdezi az összes admint. */
  public getAdmins (): Promise<IUser[]> {
    return this.db.getArray(`
    ${ this.getBaseSql() }
    WHERE deletedAt IS NULL
    AND role = ${ EUserRole.Admin }
    `)
  }

  /** Lekérdezi az összes futárt. */
  public getCouriers (): Promise<IUser[]> {
    return this.db.getArray(`
    ${ this.getBaseSql() }
    WHERE deletedAt IS NULL
    AND role = ${ EUserRole.Courier }
    `)
  }

  /**
   * Lekérdez egy felhasználót jogosultság és id alapján.
   * @param id - Az id.
   * @param role - A jogosultság.
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
   * Lekérdez egy adott azonosítójú ügyfelet.
   * @param id - Az ügyfél azonosítója.
   */
  public getCustomer (id: number): Promise<IUser | null> {
    return this.db.getRow(`
      ${ this.getBaseSql() }
      WHERE deletedAt IS NULL
      AND id = ?
      AND role = ${ EUserRole.Customer }
      `, [ id ])
  }

  /**
   * Lekérdez egy adott azonosítójú admint.
   * @param id - Az admin azonosítója.
   */
  public getAdmin (id: number): Promise<IUser | null> {
    return this.db.getRow(`
      ${ this.getBaseSql() }
      WHERE deletedAt IS NULL
      AND id = ?
      AND role = ${ EUserRole.Admin }
      `, [ id ])
  }

  /**
   * Lekérdez egy adott azonosítójú futárt.
   * @param id - A futár azonosítója.
   */
  public getCourier (id: number): Promise<IUser | null> {
    return this.db.getRow(`
      ${ this.getBaseSql() }
      WHERE deletedAt IS NULL
      AND id = ?
      AND role = ${ EUserRole.Courier }
      `, [ id ])
  }

  /**
   * Kitörli az adott id-vel rendelkező ügyfelet.
   * @param id - Az id.
   */
  public async deleteCustomer (id: number): Promise<boolean> {
    const result = await this.db.exec(`
      UPDATE ${ this.tableName }
      SET deletedAt = NOW()
      WHERE id = ?
      AND role = ${ EUserRole.Customer }
    `, [ id ])

    return this.db.hasChangedRows(result)
  }

  /**
   * Kitörli az adott id-vel rendelkező admint.
   * @param id - Az id.
   */
  public async deleteAdmin (id: number): Promise<boolean> {
    const result = await this.db.exec(`
      UPDATE ${ this.tableName }
      SET deletedAt = NOW()
      WHERE id = ?
      AND role = ${ EUserRole.Admin }
    `, [ id ])

    return this.db.hasChangedRows(result)
  }

  /**
   * Kitörli az adott id-vel rendelkező futárt.
   * @param id - Az id.
   */
  public async deleteCourier (id: number): Promise<boolean> {
    const result = await this.db.exec(`
      UPDATE ${ this.tableName }
      SET deletedAt = NOW()
      WHERE id = ?
      AND role = ${ EUserRole.Courier }
    `, [ id ])

    return this.db.hasChangedRows(result)
  }

  /**
   * Egy adott azonosítóval rendelkező felhasználó törlését visszaállítja.
   * @param id - Az id.
   */
  public async deleteUndo (id: number): Promise<boolean> {
    const result = await this.db.exec(`
      UPDATE ${ this.tableName }
      SET deletedAt = NULL
      WHERE id = ?
      AND deletedAt IS NOT NULL
    `, [ id ])

    return this.db.hasChangedRows(result)
  }

  /**
   * Frissíti egy adott azonosítóval rendelkező ügyfél egy adatát.
   * @param id - Az ügyfél azonosítója.
   * @param row - Melyik adatot kell módosítani.
   * @param data - Mire kell módosítani.
   */
  public async updateCustomer (id: number, row: string, data: string): Promise<boolean> {
    const result = await this.db.exec(`
      UPDATE ${ this.tableName }
      SET ${ row } = ?
      WHERE deletedAt IS NULL
      AND id = ?
      AND role = ${ EUserRole.Customer }
    `, [ data, id ])

    return this.db.hasAffectedRows(result)
  }

  /**
   * Frissíti egy adott azonosítóval rendelkező admin egy adatát.
   * @param id - Az admin azonosítója.
   * @param row - Melyik adatot kell módosítani.
   * @param data - Mire kell módosítani.
   */
  public async updateAdmin (id: number, row: string, data: string): Promise<boolean> {
    const result = await this.db.exec(`
      UPDATE ${ this.tableName }
      SET ${ row } = ?
      WHERE deletedAt IS NULL
      AND id = ?
      AND role = ${ EUserRole.Admin }
    `, [ data, id ])

    return this.db.hasAffectedRows(result)
  }

  /**
   * Frissíti egy adott azonosítóval rendelkező futár egy adatát.
   * @param id - A futár azonosítója.
   * @param row - Melyik adatot kell módosítani.
   * @param data - Mire kell módosítani.
   */
  public async updateCourier (id: number, row: string, data: string): Promise<boolean> {
    const result = await this.db.exec(`
      UPDATE ${ this.tableName }
      SET ${ row } = ?
      WHERE deletedAt IS NULL
      AND id = ?
      AND role = ${ EUserRole.Courier }
    `, [ data, id ])

    return this.db.hasAffectedRows(result)
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
