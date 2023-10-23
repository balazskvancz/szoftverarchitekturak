import type MySql from '@common/MySQL/MySQL'

import SessionsService from './services/SessionsService'

export interface IService {
  sessions: SessionsService
}

/**
 * Létrehozza a services objectet a megadott egyedhez társított MySQL kapcsolat alapján.
 * @param mysql - Az adatbázis kapcsolat.
 */
export default function getServices (mysql: MySql): IService {
  return {
    sessions: new SessionsService(mysql, 'sessions')
  }
}
