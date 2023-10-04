import MySql from '@common/MySQL/MySQL'

import type { IDatabaseConfig } from './definitions'

/**
 * Adatbázis kapcsolat létrehozása konfig alapján.
 * @param config - Adatbázishoz tartozó konfig.
 */
export default function initDatabase (config: IDatabaseConfig): MySql {
  const db = new MySql({
    ...config
  })

  db.connect()

  return db
}
