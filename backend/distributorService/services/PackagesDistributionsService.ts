import type {
  IPackageDistribution,
  TPackageDistributions,
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
   * Visszaadja az adott azonosítóval rendelkező feladatot.
   * @param id - A keresendő egyed azonosítója.
   */
  public getById (id: number): Promise<IPackageDistribution | null> {
    return this.db.getRow(`
      ${ this.getBaseSql() }
      WHERE id = ?
    `, [ id ])
  }

  /**
   * Visszaadja az éppen teljesítendő feladatot a futárnak.
   * @param courierId - Futár azonosító.
   */
  public getCurrentlyWorking (courierId: number): Promise<IPackageDistribution | null> {
    return this.db.getRow(`
      ${ this.getBaseSql() }
      WHERE courierId = ?
      AND doneAt IS NULL
      ORDER BY createdAt ASC
      LIMIT 1
    `, [ courierId ])
  }

  /**
   * Visszaadja az utolsó, még az adott napon elvégzett feladatot.
   * @param courierId - Futár azonosító.
   * @param day       - Nap (dátum).
   */
  public getPreviousJobByDay (courierId: number, day: string): Promise<IPackageDistribution | null> {
    return this.db.getRow(`
      ${ this.getBaseSql() }
      WHERE courierId = ?
      AND doneAt LIKE '${ this.db.unQuotedEscape(day) }%'
      ORDER BY doneAt DESC
      LIMIT 1
    `, [ courierId ])
  }

  /**
   * Egy adott egyed „kész”-szé tétele.
   * @param id - Egyed azonosíója.
   */
  public async setDone (id: number): Promise<boolean> {
    const result = await this.db.exec(`
      UPDATE ${ this.tableName } SET
        doneAt = NOW()
      WHERE id = ?
    `, [ id ])

    return this.db.hasAffectedRows(result)
  }

  /**
   * Visszaadja az összes be nem fejezett, de kiosztott feladatot.
   * @param courierId - Futár azonosító.
   * @param day       - Nap.
   */
  public getAllNotFinished (
    courierId: number,
    day: string
  ): Promise<TPackageDistributions> {
    return this.db.getArray(`
      ${ this.getBaseSql() }
      WHERE courierId = ?
      AND   day LIKE '${ this.db.unQuotedEscape(day) } %'
      AND   doneAt IS NULL
    `, [ courierId ])
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
