import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import type { IRegisterUser } from '../../../../definitions'
import { EUserRow } from '../../../../definitions'

import type { IService } from '../../../../getServices'
import Error from '../../../../Error'
import { updateCustomerHelper } from './updateCustomerHelper'

/**
 * Egy felhasználó adatainak módosítását megvalósító végpont.
 * @param services - Services.
 */
export default function updateCustomer (services: IService): TCallbackFunction {
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
      updateCustomerHelper(services, userData, id, EUserRow.name),
      updateCustomerHelper(services, userData, id, EUserRow.email),
      updateCustomerHelper(services, userData, id, EUserRow.password)
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
