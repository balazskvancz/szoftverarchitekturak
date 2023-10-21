import BaseService from '@common/backend/BaseService'

import type { IAddress, IBaseAddress } from '../definitions'

export default class AddressesService extends BaseService {
  /**
   * Beszúr egy új egyedet.
   * @param data - A beszúrandó adat.
   */
  public async insert (data: IBaseAddress): Promise<number> {
    const values = [
      data.country, data.postalCode, data.city,
      data.street, data.house
    ]

    const result = await this.db.exec(`
      INSERT INTO ${ this.tableName } SET
        country     = ?,
        postalCode  = ?,
        city        = ?,
        street      = ?,
        house       = ?,
        createdAt   = NOW()
    `, values)

    return this.db.insertId(result)
  }

  /**
   * Egy adott azonosítóval rendelkező cím lekérése.
   * @param id - A keresendő egyed azonosítója.
   */
  public getById (id: number): Promise<IAddress | null> {
    return this.db.getRow(`
      ${ this.getBaseSql() }
      WHERE id = ?
    `, [ id ])
  }

  /** Alap SQL lekérdezés. */
  private getBaseSql (): string {
    return `
      SELECT
        id,
        country,
        postalCode,
        city,
        street,
        house,
        createdAt
      FROM ${ this.tableName }
    `
  }
}
