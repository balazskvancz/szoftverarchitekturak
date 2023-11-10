import type MySql from '@common/MySQL/MySQL'

import UsersService from './services/UsersService'
import CouriersService from './services/CouriersService'
import CustomersService from './services/CustomersService'
import CourierWorkingDaysService from './services/CourierWorkingDaysService'

export interface IService {
  users: UsersService
  couriers: CouriersService
  customers: CustomersService
  courierWorkingDays: CourierWorkingDaysService

}

/**
 * Létrehozza a services objectet a megadott egyedhez társított MySQL kapcsolat alapján.
 * @param mysql - Az adatbázis kapcsolat.
 */
export default function getServices (mysql: MySql): IService {
  return {
    users: new UsersService(mysql, 'users'),
    couriers: new CouriersService(mysql, 'couriers'),
    customers: new CustomersService(mysql, 'customers'),
    courierWorkingDays: new CourierWorkingDaysService(mysql, 'courierWorkingDays')
  }
}
