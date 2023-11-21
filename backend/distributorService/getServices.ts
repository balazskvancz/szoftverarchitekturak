import type MySql from '@common/MySQL/MySQL'

import PackageDistributionsService from './services/PackagesDistributionsService'

export interface IService {
  packageDistributions: PackageDistributionsService
}

/**
 * Létrehozza a services objectet a megadott egyedhez társított MySQL kapcsolat alapján.
 * @param mysql - Az adatbázis kapcsolat.
 */
export default function getServices (mysql: MySql): IService {
  return {
    packageDistributions: new PackageDistributionsService(mysql, 'packageDistributions')
  }
}
