import type {
  IPackageDistribution,
  IBasePackageDistribution
} from '../definitions'

import BaseService from '@common/backend/BaseService'

export default class PackageDistributionsService extends BaseService {
  /**
   * Egy új egyed beszúrása.
   * @param data - A beszúrandó adat.
   */
  public async insert (data: IBasePackageDistribution): Promise<number> {
    const result = await this.db.exec(`
      INSERT INTO ${ this.tableName } SET
        packageId = ?,
        courierId = ?,
        action    = ?,
        createdAt = NOW()
    `, [ data.packageId, data.courierId, data.action ])

    return this.db.insertId(result)
  }

  /**
   * Visszaadja a következő feladatot egy adott futárnak.
   * @param courierId - Futár azonosító.
   */
  public getNextByCourier (courierId: number): Promise<IPackageDistribution | null> {
    return this.db.getRow(`
      ${ this.getBaseSql() }
      WHERE courierId = ?
      AND doneAt IS NULL
      ORDER BY createdAt ASC
      LIMIT 1
    `, [ courierId ])
  }

  /**
   * Egy adott egyed „kész”-szé tétele.
   * @param id - Egyed azonosíója.
   */
  public async setDone (id: number): Promise<boolean> {
    const result = await this.db.exec(`
      UPDATE ${ this.tableName } SELECT
        doneAt = NOW()
      WHERE id = ?
    `, [ id ])

    return this.db.hasAffectedRows(result)
  }

  /** Alap SQL lekérdezés. */
  private getBaseSql (): string {
    return `
      SELECT
        id,
        packageId,
        courierId,
        action,
        doneAt,
        createdAt
      FROM ${ this.tableName }
    `
  }
}
