import type MySql from '@common/MySQL/MySQL'

import CourierWorkingDaysService  from './services/CourierWorkingDaysService'
import CouriersService            from './services/CouriersService'
import CustomerAddressesService   from './services/CustomerAddressesService'
import CustomersService           from './services/CustomersService'
import UsersService               from './services/UsersService'

export interface IService {
  courierWorkingDays: CourierWorkingDaysService
  couriers: CouriersService
  customerAddresses: CustomerAddressesService
  customers: CustomersService
  users: UsersService
}

/**
 * Létrehozza a services objectet a megadott egyedhez társított MySQL kapcsolat alapján.
 * @param mysql - Az adatbázis kapcsolat.
 */
export default function getServices (mysql: MySql): IService {
  return {
    courierWorkingDays: new CourierWorkingDaysService(mysql, 'courierWorkingDays'),
    couriers:           new CouriersService(mysql, 'couriers'),
    customerAddresses:  new CustomerAddressesService(mysql, 'customerAddresses'),
    customers:          new CustomersService(mysql, 'customers'),
    users:              new UsersService(mysql, 'users')
  }
}
