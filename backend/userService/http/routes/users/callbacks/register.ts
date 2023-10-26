import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import Error from '@userService/Error'

import { EUserRole } from '@userService/definitions'
import type { IInsertUser, IRegisterCourier  } from '@userService/definitions'

import type { IService } from '@userService/getServices'

/**
 * Egy új felhasználó felvételét megvalósító végpont.
 * @param services - Services.
 */
export default function register (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const userData = ctx.getBody<IRegisterCourier>()

    if (!Validator.isDefined(userData)) {
      ctx.sendError({
        code: Error.codes.ERR_MISSING_BODY,
        message: Error.messages.ERR_MISSING_BODY
      })

      return
    }

    if (!Validator.isNonEmptyString(userData.name)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_POSTDATA,
        message: 'Hiányzó név!'
      })

      return
    }

    if (!Validator.isNonEmptyString(userData.email)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_POSTDATA,
        message: 'Hiányzó email!'
      })

      return
    }

    if (!Validator.isNonEmptyString(userData.password)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_POSTDATA,
        message: 'Hiányzó jelszó!'
      })

      return
    }

    if (!Validator.isNonEmptyString(userData.phoneNum)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_POSTDATA,
        message: 'Hiányzó telefonszám!'
      })

      return
    }

    const insertUser: IInsertUser = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: EUserRole.Customer
    }

    const insertedId = await services.usersService.insert(insertUser)

    if (insertedId <= 0) {
      ctx.sendError({
        code: Error.codes.ERR_DB_INSERT,
        message: Error.messages.ERR_DB_INSERT
      })

      return
    }

    const isSuccessfull = await services.customersService.insert(insertedId, userData.phoneNum)

    if (!isSuccessfull) {
      ctx.sendError({
        code: Error.codes.ERR_DB_INSERT,
        message: Error.messages.ERR_DB_INSERT
      })

      return
    }

    ctx.sendOk()
  }
}
