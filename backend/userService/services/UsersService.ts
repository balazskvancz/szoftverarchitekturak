import BaseService from '@common/backend/BaseService'

import type { IUser, TUserType, IBaseUser, IInsertUser } from '../definitions'

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
        role      = ?,
        createdAt = NOW()
    `, [ insertData.name, insertData.email, insertData.password, insertData.role ])

    return this.db.insertId(result)
  }

  /** Lekérdezi az összes felhasználót. */
  public getAllUsers (): Promise<IUser[]> {
    return this.db.getArray(this.getBaseSql())
  }

  /**
   * Lekérdezi az összes felhasználót jogosultság alapján.
   * @param role - A jogosultság.
   */
  public getUsers (role: TUserType): Promise<IUser[]> {
    return this.db.getArray(`
      ${ this.getBaseSql() }
      AND role = '${ role }'
    `)
  }

  /**
   * Lekérdez egy felhasználót azonosító szerint.
   * @param id - A keresendő azonosító.
   */
  public getById (id: number): Promise<IUser | null> {
    return this.db.getRow(`
      ${ this.getBaseSql() }
      AND id = ?
    `, [ id ])
  }

  /**
   * Lekérdez egy felhasználót e-mail cím szerint.
   * @param email - E-mail cím.
   */
  public getByEmailAddress (email: string): Promise<IUser | null> {
    return this.db.getRow(`
      ${ this.getBaseSql() }
      AND email = ?
    `, [ email ])
  }

  /**
   * E-mail cím és jelszó szerinti lekérdezés.
   * @param email     - E-mail cím.
   * @param password  - Jelszó.
   */
  public getUserByEmailAndPass (email: string, password: string): Promise<IUser | null> {
    return this.db.getRow(`
      ${ this.getBaseSql() }
        AND email     = ?
        AND password  = ?
    `, [ email, password ])
  }

  /**
   * Lekérdez egy felhasználót jogosultság és id alapján.
   * @param id    - Az id.
   */
  public getUser (id: number): Promise<IUser | null> {
    return this.db.getRow(`
      ${ this.getBaseSql() }
      AND id = ?
    `, [ id ])
  }

  /**
   * Soft töröl egy felhasználót jogosultság és id alapján.
   * @param id    - Az id.
   */
  public async deleteById (id: number): Promise<boolean> {
    const result = await this.db.exec(`
      UPDATE ${ this.tableName } SET
        deletedAt = NOW()
      WHERE id = ?
    `, [ id ])

    return this.db.hasChangedRows(result)
  }

  /**
   * Egy adott felhasználó adatainak módosítása.
   * @param id    - Azonosító.
   * @param data  - Adat.
   */
  public async update (id: number, data: IBaseUser): Promise<boolean> {
    const result = await this.db.exec(`
      UPDATE ${ this.tableName } SET
        name  = ?,
        email = ?
      WHERE id = ?
    `, [ data.name, data.email, id ])

    return this.db.hasAffectedRows(result)
  }

  /**
   * Egy adott felhasználó jelszavának módosítása.
   * @param id        - Felhasználó azonosító.
   * @param password  - Az új jelszó hashelve.
   */
  public async updatePassword (id: number, password: string): Promise<boolean> {
    const result = await this.db.exec(`
      UPDATE ${ this.tableName } SET
        password = ?
      WHERE id = ?
    `, [ password, id ])

    return this.db.hasAffectedRows(result)
  }

  /** Alap SQL lekérdezés. */
  private getBaseSql (): string {
    return `
      SELECT
        id,
        name,
        email,
        role,
        createdAt
      FROM ${ this.tableName }
      WHERE deletedAt IS NULL
    `
  }
}
