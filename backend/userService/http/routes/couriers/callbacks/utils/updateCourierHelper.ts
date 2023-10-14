import type { IError } from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import { EUserRole, type IRegisterUser } from '../../../../../definitions'
import type { EUserRow } from '../../../../../definitions'

import type { IService } from '../../../../../getServices'
import Error from '../../../../../Error'

/**
 * Frissíti egy futár egy adatát a megkapott sorban, ha érkezett hozzá valid adat.
 * @param services  - Services.
 * @param userData  - Frissítő adathalmaz.
 * @param id        - Id.
 * @param dataRow   - Ezt a sort kell frissíteni.
 */
export async function updateCourierHelper (
  services: IService,
  userData: IRegisterUser,
  id: number,
  dataRow: EUserRow
): Promise<IError | null> {
  if (!Validator.isObjectHaveKeys(userData, [ dataRow ])) {
    return {
      code: Error.codes.ERR_MISSING_KEY,
      message: Error.messages.ERR_MISSING_KEY }
  }

  if (!Validator.isNonEmptyString(userData[dataRow])) {
    return  {
      code: Error.codes.ERR_WRONG_POSTDATA,
      message: Error.messages.ERR_WRONG_POSTDATA }
  }

  const rowChangeData = userData[dataRow]
  const isSuccessfull = await services.usersService.updateUser(id, dataRow, rowChangeData, EUserRole.Courier)

  if (!isSuccessfull) {
    return {
      code: Error.codes.ERR_DB_UPDATE,
      message: Error.messages.ERR_DB_UPDATE }
  }

  return null
}
