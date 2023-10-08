import BaseService from '@common/backend/BaseService'

import { EUserRole } from '../definitions'
import type { IUser, IInsertUser, IRegisterUser } from '../definitions'

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

/**
 * Regisztrál egy új ügyfelet.
 * @param registrationData - Az ügyfél adatai.
 */
  public async registration (registrationData: IRegisterUser): Promise<number> {
    const result = await this.db.exec(`
      INSERT INTO ${ this.tableName } SET
        name      = ?,
        email     = ?,
        password  = ?,
        createdAt = NOW(),
        role      =  ${ EUserRole.Costumer }
    `, [ registrationData.name, registrationData.email, registrationData.password ])

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
    WHERE deletedAt IS NULL AND role = ${ EUserRole.Costumer }
    `)
  }

  /**
   * Lekérdez egy adott azonosítójú ügyfelet.
   * @param id - Az ügyfél azonosítója.
   */
  public getCustomer (id: number): Promise<IUser[]> {
    return this.db.getArray(`
      ${ this.getBaseSql() }
      WHERE deletedAt IS NULL AND role = ${ EUserRole.Costumer } AND id = ?
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
    `, [ id ])

    return this.db.hasChangedRows(result)
  }

  /**
   * Frissíti az ügyfél egy adatát.
   * @param id - Az ügyfél azonosítója.
   * @param row - Melyik adatot kell módosítani.
   * @param data - Mire kell módosítani.
   */
  public async updateCustomer (id: number, row: string, data: string): Promise<boolean> {
    const result = await this.db.exec(`
      UPDATE ${ this.tableName }
      SET ${ row } = ?
      WHERE id = ?
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
