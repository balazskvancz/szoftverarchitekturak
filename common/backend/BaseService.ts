import type MySQL from '@common/MySQL/MySQL'

import Validator from '@common/Validator/Validator'

import type { IRowsCount } from './definitions'

export default abstract class BaseService {
  public tableName: string
  protected db: MySQL

  public constructor (db: MySQL, tableName: string) {
    this.db = db
    this.tableName = tableName
  }

  /**
   * Visszaadja a reláció számosságát.
   * @param predicates - Where utáni feltételek.
   */
  public async getTotalCount (...predicates: unknown[]): Promise<number> {
    const preds = predicates.length === 0
      ? ''
      : Validator.isNonEmptyString(predicates[0])
        ? predicates[0]
        : ''

    const data = await this.db.getRow<IRowsCount>(`
      SELECT
        COUNT(*) AS count
      FROM
        ${ this.tableName }
      ${ preds }
    `)

    return data ? data.count : 0
  }
}
