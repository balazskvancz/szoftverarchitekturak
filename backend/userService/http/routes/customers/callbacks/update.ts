import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import Error from '@userService/Error'

import type { IUser, IBaseCustomer } from '@userService/definitions'
import { EBindValue } from '@userService/definitions'

import type { IService } from '@userService/getServices'

import validateUpdate from './utils/validateUpdate'

/**
 * Egy felhasználó egy adatmezőjének módosítását megvalósító végpont.
 * @param services - Services.
 */
export default function update (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const { id } = ctx.getRouteParams()

    if (!Validator.isPositiveNumber(id)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_PARAM,
        message: Error.messages.ERR_WRONG_PARAM
      })

      return
    }

    const user = ctx.getBindedValue<IUser>(EBindValue.User)

    if (!Validator.isDefined(user)) {
      ctx.sendError({
        code: Error.codes.ERR_USER_NOT_AUTHENTICATED,
        message: Error.messages.ERR_USER_NOT_AUTHENTICATED
      })

      return
    }

    const postData = ctx.getBody<IBaseCustomer>()

    if (!Validator.isDefined(postData)) {
      ctx.sendError({
        code: Error.codes.ERR_MISSING_BODY,
        message: Error.messages.ERR_MISSING_BODY
      })

      return
    }

    const formErrors = validateUpdate(postData)

    if (Validator.isNonEmptyArray(formErrors)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_POSTDATA,
        formErrors
      })

      return
    }

    const customer = await services.customers.getById(id)

    if (Validator.isNull(customer)) {
      ctx.sendError({
        code: Error.codes.ERR_USER_NOT_EXISTS,
        message: Error.messages.ERR_USER_NOT_EXISTS
      })

      return
    }

    // Csak admin vagy saját maga módosíthat.
    if (
      user.role !== 'admin' && // Tehát csak admin
      !(user.role === 'customer' && user.id === customer.id)
    ) {
      ctx.sendError({
        code: Error.codes.ERR_MISSING_PERMISSON,
        message: Error.messages.ERR_MISSING_PERMISSON
      })

      return
    }

    // E-mail változtatás.
    if (postData.email !== customer.email) {
      const alreadyTaken = await services.users.getByEmailAddress(postData.email)

      if (!Validator.isNull(alreadyTaken)) {
        ctx.sendError({
          code: Error.codes.ERR_WRONG_POSTDATA,
          formErrors: [
            {
              key: 'email',
              message: 'Az e-mail cím már használatban van!'
            }
          ]
        })

        return
      }
    }

    const isUpdated = await services.users.update(id, {
      ...postData
    })

    if (!isUpdated) {
      ctx.sendError({
        code: Error.codes.ERR_DB_UPDATE,
        message: Error.messages.ERR_DB_UPDATE
      })

      return
    }

    await services.customers.update(id, postData.telephone)

    ctx.sendOk()
  }
}
