import BaseService from '@common/backend/BaseService'

import type {
  IAddress,
  TAddresses,
  IInsertAddress

} from '../definitions'

export default class AddressesService extends BaseService {
  /**
   * Beszúr egy új egyedet.
   * @param data - A beszúrandó adat.
   */
  public async insert (data: IInsertAddress): Promise<number> {
    const values = [
      data.country, data.postalCode,
      data.city, data.street, data.house,
      data.longitude, data.latitude
    ]

    const result = await this.db.exec(`
      INSERT INTO ${ this.tableName } SET
        country     = ?,
        postalCode  = ?,
        city        = ?,
        street      = ?,
        house       = ?,
        longitude   = ?,
        latitude    = ?,
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

  /**
   * Visszaadja az összes olyan egyedet, amelynek az
   * az azonosítója benne van a megadott tömbben.
   * @param ids - A keresendő egyedek azonosítói.
   * @returns
   */
  public getByIds (ids: number[]): Promise<TAddresses> {
    return this.db.getArray(`
      ${ this.getBaseSql() }
      WHERE id IN (${ ids.join(', ') })
    `)
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
        longitude,
        latitude,
        createdAt
      FROM ${ this.tableName }
    `
  }
}
