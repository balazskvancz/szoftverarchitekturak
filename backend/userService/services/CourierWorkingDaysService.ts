import BaseService from '@common/backend/BaseService'

import type {
  TCourierWorkingDays,
  IBaseCourierWorkingDay
} from '../definitions'

export default class CourierWorkingDaysService extends BaseService {
  /**
   * Tömeges beszúrás.
   * @param data - Beszúrandó adatok.
   */
  public async massInsert (data: IBaseCourierWorkingDay[]): Promise<boolean> {
    const values = data.map(({ day, userId }) => {
      return `${ userId }, ${ this.db.escape(day) }, NOW()`
    })

    const result = await this.db.exec(`
      INSERT INTO ${ this.tableName }
        (userId, day, createdAt)
      VALUES ${ values.join(', \n') }
    `)

    return this.db.hasAffectedRows(result)
  }

  /**
   * Felhasználó szerinti munkanapok lekérdezése.
   * @param userId    - Felhasználó azonosító.
   * @param startDate - Kezdő dátum, ha van.
   */
  public getByUserId (
    userId: number,
    startDate?: string
  ): Promise<TCourierWorkingDays> {
    const predicate = startDate
      ? `AND day >= ${ this.db.escape(startDate) }`
      : ''

    return this.db.getArray(`
      ${ this.getBaseSql() }
      WHERE userId = ?
      ${ predicate }
    `, [ userId ])
  }

  /**
   * Egy egyed törlése.
   * @param data - Adat.
   */
  public async deleteDay (data: IBaseCourierWorkingDay): Promise<boolean> {
    const result = await this.db.exec(`
      DELETE FROM ${ this.tableName }
      WHERE userId = ?
      AND day = ?
    `, [ data.userId, data.day ])

    return this.db.hasAffectedRows(result)
  }

  /** Alap SQL lekérdezés. */
  private getBaseSql (): string {
    return `
      SELECT
        id,
        userId,
        day,
        createdAt
      FROM ${ this.tableName }
    `
  }
}
