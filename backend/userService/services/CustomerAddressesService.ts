import BaseService from '@common/backend/BaseService'
import type { TCustomerAddresses, IBaseCustomerAddress } from '../definitions'

export default class CustomerAddressesService extends BaseService {
  /**
   * Egy új felhasználó-cím beszúrása.
   * @param data - Beszúrandó adat.
   */
  public async insert (data: IBaseCustomerAddress): Promise<boolean> {
    const result = await this.db.exec(`
      INSERT INTO ${ this.tableName } SET
        userId    = ?,
        addressId = ?,
        createdAt = NOW()
    `, [ data.userId, data.addressId ])

    return this.db.hasAffectedRows(result)
  }

  /**
   * Egy felhasználó-cím törlése.
   * @param data - Törlendő adat.
   */
  public async deleteConnection (data: IBaseCustomerAddress): Promise<boolean> {
    const result = await this.db.exec(`
      DELETE FROM ${ this.tableName }
      WHERE userId    = ?
      AND   addressId = ?
    `, [ data.userId, data.addressId ])

    return this.db.hasAffectedRows(result)
  }

  /**
   * Felhasználó azonosító szerinti lekérdezés.
   * @param userId - Felhasználó azonosító.
   */
  public getByUser (userId: number): Promise<TCustomerAddresses> {
    return this.db.getArray(`
      ${ this.getBaseSql() }
      WHERE userId = ?
    `, [ userId ])
  }

  /** Alap SQL lekérdezés. */
  private getBaseSql (): string {
    return `
      SELECT
        userId,
        addressId,
        createdAt
      FROM ${ this.tableName }
    `
  }
}
