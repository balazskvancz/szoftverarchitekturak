import BaseService from '@common/backend/BaseService'

export default class CourierWorkingDaysService extends BaseService {
/**
 * Egy új munkanap beszúrása.
 * @param id - A munkanaphoz tartozó futár azonosítója.
 * @param day - A nap.
 */
  public async insert (id: number, day: string): Promise<boolean> {
    const result = await this.db.exec(`
    INSERT INTO ${ this.tableName } SET
      userId    =   ?,
      day       =   ?,
      createdAt =   NOW()
  `, [ id, day ])

    return this.db.hasAffectedRows(result)
  }
}
