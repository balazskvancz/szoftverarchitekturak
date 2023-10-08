import type { IError } from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import { EUserRole, type IRegisterUser } from '../../../../definitions'
import type { EUserRow } from '../../../../definitions'

import type { IService } from '../../../../getServices'
import Error from '../../../../Error'

export async function updateAdminHelper (services: IService,
  userData: IRegisterUser, id: number, role: EUserRow): Promise<IError | null> {
  if (!Validator.isObjectHaveKeys(userData, [ role ])) {
    return {
      code: Error.codes.ERR_MISSING_KEY,
      message: Error.messages.ERR_MISSING_KEY }
  }

  if (!Validator.isNonEmptyString(userData[role])) {
    return  {
      code: Error.codes.ERR_WRONG_POSTDATA,
      message: Error.messages.ERR_WRONG_POSTDATA }
  }

  const rowChangeData = userData[role]
  const isSuccessfull = await services.usersService.updateUser(id, role, rowChangeData, EUserRole.Admin)

  if (!isSuccessfull) {
    return {
      code: Error.codes.ERR_DB_UPDATE,
      message: Error.messages.ERR_DB_UPDATE }
  }

  return null
}
