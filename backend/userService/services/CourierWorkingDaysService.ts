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
      return `(${ userId }, ${ this.db.escape(day) }, NOW())`
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
   * @param yearhMonth - Kezdő dátum, ha van.
   */
  public getByUserId (
    userId: number,
    yearhMonth?: string
  ): Promise<TCourierWorkingDays> {
    const predicate = yearhMonth
      ? `AND day BETWEEN ${ this.db.escape(`${ yearhMonth }-1`) } AND ${ this.db.escape(`${ yearhMonth }-31`) }`
      : ''

    return this.db.getArray(`
      ${ this.getBaseSql() }
      WHERE userId = ?
      ${ predicate }
    `, [ userId ])
  }

  /**
   * Dátum szerinti lekérdezés.
   * @param date - Dátum.
   */
  public getByDate (date: string): Promise<TCourierWorkingDays> {
    return this.db.getArray(`
      ${ this.getBaseSql() }
      WHERE day = ?
    `, [ date ])
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

  /**
   * Tömeges törlés.
   * @param ids - Törlendő egyedek azonosíója.
   */
  public async massDelete (ids: number[]): Promise<boolean> {
    const result = await this.db.exec(`
      DELETE FROM ${ this.tableName }
      WHERE id IN (${ ids.join(', ') })
    `)

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
