import BaseService from '@common/backend/BaseService'

import type {
  IPackageLifeCycle,
  TPackageLifeCycles,
  IBasePackageLifeCycle
} from '../definitions'

type TOrder = 'asc' | 'desc'

export default class PackageLifeCyclesService extends BaseService {
  /**
   * Egy új egyed beszúrása.
   * @param data - A beszúrandó adat.
   */
  public async insert (data: IBasePackageLifeCycle): Promise<number> {
    const result = await this.db.exec(`
      INSERT INTO ${ this.tableName } SET
        packageId = ?,
        userId    = ?,
        action    = ?,
        createdAt = NOW()
    `, [ data.packageId, data.userId, data.action ])

    return this.db.insertId(result)
  }

  /**
   * Visszaadja egy adott csomaghoz tartozó utolsó életciklus eseményt.
   * @param packageId - A csomag azonosítója.
   */
  public getLatest (packageId: number): Promise<IPackageLifeCycle | null> {
    return this.db.getRow(`
      ${ this.getBaseSql() }
      WHERE packageId = ?
      ORDER BY createdAt DESC
      LIMIT 1
    `, [ packageId ])
  }

  /**
   * Visszaadja egy adott csomaghoz tartozó összes életciklus eseményt.
   * @param packageId - A csomag azonosítója.
   * @param order     - A sorrend.
   */
  public getAll (packageId: number, order: TOrder = 'asc'): Promise<TPackageLifeCycles> {
    const orderBy = order === 'asc'
      ? 'ASC'
      : 'DESC'

    return this.db.getArray(`
      ${ this.getBaseSql() }
      WHERE packageId = ?
      ORDER BY createdAt ${ orderBy }
    `, [ packageId ])
  }

  /** Alap SQL lekérdezés. */
  private getBaseSql (): string {
    return `
      SELECT
        id,
        packageId,
        userId,
        action,
        createdAt
      FROM ${ this.tableName }
    `
  }
}
