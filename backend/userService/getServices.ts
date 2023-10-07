import type MySql from '@common/MySQL/MySQL'

import UsersService from './services/UsersService'

export interface IService {
  usersService: UsersService
}

/**
 * Létrehozza a services objectet a megadott egyedhez társított MySQL kapcsolat alapján.
 * @param mysql - Az adatbázis kapcsolat.
 */
export default function getServices (mysql: MySql): IService {
  return {
    usersService: new UsersService(mysql, 'users')
  }
}
