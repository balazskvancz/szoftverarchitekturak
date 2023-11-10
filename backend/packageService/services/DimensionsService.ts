import BaseService from '@common/backend/BaseService'

import type {
  IDimension,
  TDimensions,
  IBaseDimension
} from '../definitions'

export default class DimensionsService extends BaseService {
  /**
   * Egy új egyed beszúrása.
   * @param data - A beszúrandó adat.
   */
  public async insert (data: IBaseDimension): Promise<number> {
    const result = await this.db.exec(`
      INSERT INTO ${ this.tableName } SET
        length    = ?,
        depth     = ?,
        width     = ?,
        createdAt = NOW()
    `, [ data.length, data.depth, data.width ])

    return this.db.insertId(result)
  }

  /**
   * Egy egyed adatainak megváltoztatása.
   * @param id    - Az egyed azonosítója.
   * @param data  - A módosítandó adat.
   */
  public async update (id: number, data: IBaseDimension): Promise<boolean> {
    const result = await this.db.exec(`
      UPDATE ${ this.tableName } SET
        length  = ?,
        depth   = ?,
        width   = ?
      WHERE id = ?
    `, [ data.length, data.depth, data.width, id ])

    return this.db.hasAffectedRows(result)
  }

  /**
   * Elkér egy egyedet annak azonosítója alapján.
   * @param id - A keresendő egyed azonosítója.
   */
  public getById (id: number): Promise<IDimension | null> {
    return this.db.getRow(`
      ${ this.getBaseSql() }
      AND id = ?
    `, [ id ])
  }

  /** Visszaadja az összes felvett egyedet. */
  public getAll (): Promise<TDimensions> {
    return this.db.getArray(this.getBaseSql())
  }

  /**
   * Egy adott dimenzió törlése azonosító szerint.
   * @param id - Azonosító.
   */
  public async deleteById (id: number): Promise<boolean> {
    const result = await this.db.exec(`
      UPDATE ${ this.tableName } SET
        deletedAt = NOW()
      WHERE id = ?
    `, [ id ])

    return this.db.hasAffectedRows(result)
  }

  /** Alap SQL lekérdezés. */
  private getBaseSql (): string {
    return `
      SELECT
        id,
        length,
        depth,
        width,
        createdAt
      FROM ${ this.tableName }
      WHERE deletedAt IS NULL
    `
  }
}
