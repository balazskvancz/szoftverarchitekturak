import BaseService from '@common/backend/BaseService'

import type { IPackage, IInsertPackage } from '../definitions'

export default class PackagesService extends BaseService {
  /**
   * Egy új egyed beszúrása.
   * @param data - A beszúrandó adat.
   */
  public async insert (data: IInsertPackage): Promise<number> {
    const values = [
      data.senderId, data.pickUpAddressId, data.destAddressId,
      data.dimensionId, data.weight,
      data.expectedDelivery, data.suitableReceipt
    ]

    const result = await this.db.exec(`
      INSERT INTO ${ this.tableName } SET
        senderId          = ?,
        pickUpAddressId   = ?,
        destAddressId     = ?,
        dimensionId       = ?,
        weight            = ?,
        expectedDelivery  = ?,
        suitableReceipt   = ?,
        createdAt         = NOW()
    `, values)

    return this.db.insertId(result)
  }

  /**
   * Egy egyed lekérdezése azonosító szerint.
   * @param id - A keresendő egyed azonosítója.
   */
  public getById (id: number): Promise<IPackage | null> {
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
        senderId,
        pickUpAddressId,
        destAddressId,
        dimensionId,
        weight,
        expectedDelivery,
        suitableReceipt,
        qrCode,
        createdAt
      FROM ${ this.tableName }
    `
  }
}
