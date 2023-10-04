import type MySql from '@common/MySQL/MySQL'

export interface IService {}

/**
 * Létrehozza a services objectet a megadott egyedhez társított MySQL kapcsolat alapján.
 * @param mysql - Az adatbázis kapcsolat.
 */
export default function getServices (mysql: MySql): IService {
  return {}
}
