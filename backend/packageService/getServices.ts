import type MySql from '@common/MySQL/MySQL'

import AddressesService         from './services/AddressesService'
import DimensionsService        from './services/DimensionsService'
import PackageLifecyclesService from './services/PackageLifecyclesService'
import PackagesService          from './services/PackagesService'

export interface IService {
  addresses: AddressesService
  dimensions: DimensionsService
  packageLifecycles: PackageLifecyclesService
  packages: PackagesService
}

/**
 * Létrehozza a services objectet a megadott egyedhez társított MySQL kapcsolat alapján.
 * @param mysql - Az adatbázis kapcsolat.
 */
export default function getServices (mysql: MySql): IService {
  return {
    addresses:          new AddressesService(mysql, 'addresses'),
    dimensions:         new DimensionsService(mysql, 'dimensions'),
    packageLifecycles:  new PackageLifecyclesService(mysql, 'packageLifecycles'),
    packages:           new PackagesService(mysql, 'packages')
  }
}
