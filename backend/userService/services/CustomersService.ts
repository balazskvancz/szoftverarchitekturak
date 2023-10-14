import BaseService from '@common/backend/BaseService'

export default class CustomersService extends BaseService {
/**
 * Egy új ügyfél beszúrása.
 * @param id - Az ügyfél azonosítója.
 * @param phoneNum - Az ügyfél telefonszáma.
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
