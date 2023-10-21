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
   * Elkér egy egyedet annak azonosítója alapján.
   * @param id - A keresendő egyed azonosítója.
   */
  public getById (id: number): Promise<IDimension | null> {
    return this.db.getRow(`
      ${ this.getBaseSql() }
      WHERE id = ?
    `, [ id ])
  }

  /** Visszaadja az összes felvett egyedet. */
  public getAll (): Promise<TDimensions> {
    return this.db.getArray(this.getBaseSql())
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
    `
  }
}
