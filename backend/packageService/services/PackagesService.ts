import BaseService from '@common/backend/BaseService'

import type { IPackage, TPackages, IInsertPackage } from '../definitions'

export default class PackagesService extends BaseService {
  /**
   * Egy új egyed beszúrása.
   * @param data - A beszúrandó adat.
   */
  public async insert (data: IInsertPackage): Promise<number> {
    const values = [
      data.senderId, data.pickUpAddressId, data.destAddressId,
      data.dimensionId, data.weight,
      data.receiverEmail, data.receiverName
    ]

    const result = await this.db.exec(`
      INSERT INTO ${ this.tableName } SET
        senderId          = ?,
        pickUpAddressId   = ?,
        destAddressId     = ?,
        dimensionId       = ?,
        weight            = ?,
        receiverEmail     = ?,
        receiverName      = ?,
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
      WHERE p.id = ?
    `, [ id ])
  }

  /**
   * Csomagok lekérdezése azonosítók szerint.
   * @param ids - A keresendő egyedek azonosítói.
   */
  public getByIds (ids: number[]): Promise<TPackages> {
    return this.db.getArray(`
      ${ this.getBaseSql() }
      WHERE p.id IN (${ ids.join(', ') })
    `)
  }

  /**
   * Küldő szerinti lekérdezés.
   * @param senderId - Küldő azonosító.
   */
  public getBySenderId (senderId: number): Promise<TPackages> {
    return this.db.getArray(`
      ${ this.getBaseSql() }
      WHERE p.senderId = ?
      ORDER BY p.createdAt DESC
    `, [ senderId ])
  }

  /** Alap SQL lekérdezés. */
  private getBaseSql (): string {
    return `
      SELECT
        p.id,
        p.senderId,
        p.pickUpAddressId,
        p.destAddressId,
        p.receiverEmail,
        p.receiverName,
        p.dimensionId,
        p.weight,
        p.expectedDelivery,
        p.suitableReceipt,
        p.qrCode,
        p.createdAt,

        d.length,
        d.depth,
        d.width
      FROM ${ this.tableName } AS p
      INNER JOIN dimensions AS d ON p.dimensionId = d.id
    `
  }
}
