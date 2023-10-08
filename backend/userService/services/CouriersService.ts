import BaseService from '@common/backend/BaseService'

export default class CouriersService extends BaseService {
/**
 * Egy új futár beszúrása.
 * @param id - A futár azonosítója.
 * @param phoneNum - A futár telefonszáma.
 */
  public async insert (id: number, phoneNum: string): Promise<boolean> {
    const result = await this.db.exec(`
    INSERT INTO ${ this.tableName } SET
      userId      = ?,
      phoneNum     = ?
  `, [ id, phoneNum ])

    return this.db.hasAffectedRows(result)
  }
}
