import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import Error from '@userService/Error'

import type { IRegisterUser } from '@userService/definitions'
import { EUserRow }           from '@userService/definitions'

import type { IService } from '@userService/getServices'

import updateAdminHelper from './utils/updateAdminHelper'

/**
 * Egy admin egy adatmezőjének módosítását megvalósító végpont.
 * @param services - Services.
 */
export default function updateAdmin (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const userData = ctx.getBody<IRegisterUser>()

    if (!Validator.isNonEmptyObject(userData)) {
      ctx.sendError({
        code: Error.codes.ERR_MISSING_BODY,
        message: Error.messages.ERR_MISSING_BODY
      })

      return
    }

    if (Object.keys(userData).length > 1) {
      ctx.sendError({
        code: Error.codes.ERR_INVALID_BODY,
        message: Error.messages.ERR_INVALID_BODY
      })

      return
    }

    const { id } = ctx.getRouteParams()

    if (!Validator.isPositiveNumber(id)) {
      ctx.sendError({
        code: Error.codes.ERR_INVALID_ID,
        message: Error.messages.ERR_INVALID_ID
      })

      return
    }

    const errors = await Promise.all([
      updateAdminHelper(services, userData, id, EUserRow.name),
      updateAdminHelper(services, userData, id, EUserRow.email),
      updateAdminHelper(services, userData, id, EUserRow.password)
    ])

    if (errors.some((e) => Validator.isNull(e))) {
      ctx.sendOk()

      return
    }

    ctx.sendError({
      code: Error.codes.ERR_WRONG_POSTDATA,
      message: Error.messages.ERR_WRONG_POSTDATA
    })
  }
}
