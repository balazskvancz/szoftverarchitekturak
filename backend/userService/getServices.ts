import type MySql from '@common/MySQL/MySQL'

import UsersService from './services/UsersService'
import CouriersService from './services/CouriersService'
import CustomersService from './services/CustomersService'
import CourierWorkingDaysService from './services/CourierWorkingDaysService'

export interface IService {
  usersService: UsersService
  couriersService: CouriersService
  customersService: CustomersService
  courierWorkingDaysService: CourierWorkingDaysService

}

/**
 * Létrehozza a services objectet a megadott egyedhez társított MySQL kapcsolat alapján.
 * @param mysql - Az adatbázis kapcsolat.
 */
export default function getServices (mysql: MySql): IService {
  return {
    usersService: new UsersService(mysql, 'users'),
    couriersService: new CouriersService(mysql, 'couriers'),
    customersService: new CustomersService(mysql, 'customers'),
    courierWorkingDaysService: new CourierWorkingDaysService(mysql, 'courierWorkingDays')
  }
}
