import type {
  IContext,
  TCallbackFunction
} from '@common/Router/definitions'

import createPassword from '@common/utils/createHash'

import Validator from '@common/Validator/Validator'

import Error from '@userService/Error'

import type { IUser, IChangePasswordRequest } from '@userService/definitions'
import { EBindValue } from '@userService/definitions'

import type { IService } from '@userService/getServices'

import validatePasswordChange from './utils/validatePasswordChange'

/**
 * Jelsz megváltoztatás végpont.
 * @param services - Services.
 */
export default function changePassword (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const user = ctx.getBindedValue<IUser>(EBindValue.User)

    if (!Validator.isDefined(user)) {
      ctx.sendError({
        code: Error.codes.ERR_USER_NOT_AUTHENTICATED,
        message: Error.messages.ERR_USER_NOT_AUTHENTICATED
      })

      return
    }

    const postData = ctx.getBody<IChangePasswordRequest>()

    if (!Validator.isDefined(postData)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_POSTDATA,
        message: Error.messages.ERR_WRONG_POSTDATA
      })

      return
    }

    const formErrors = validatePasswordChange(postData)

    if (Validator.isNonEmptyArray(formErrors)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_POSTDATA,
        formErrors
      })

      return
    }

    // Most meg kell vizsgálnil, hogy helyes-e a jelenleg megadott jelszó.
    const userByEmailAndPassword = await services.users.getUserByEmailAndPass(user.email, createPassword(postData.currentPassword))

    if (Validator.isNull(userByEmailAndPassword)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_POSTDATA,
        formErrors: [
          {
            key: 'currentPassword',
            message: 'A megadott jelenlegi jelszó helytelen!'
          }
        ]
      })

      return
    }

    // Ha ide eljutunk, akkor már csak a tényleges adatbázisbázis művelet maradt hátra.
    const isUpdated = await services.users.updatePassword(user.id, createPassword(postData.password))

    if (!isUpdated) {
      ctx.sendError({
        code: Error.codes.ERR_DB_UPDATE,
        message: Error.messages.ERR_DB_UPDATE
      })

      return
    }

    ctx.sendOk()
  }
}
