import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import Error from '@userService/Error'

import type { IGetUserByIdResponse } from '@userService/definitions'

import type { IService }  from '@userService/getServices'

/**
 * Egy felhasználó lekérdezése id alapján.
 * @param services - Services.
 */
export default function getIdByEmailPass (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const { email, pass } = ctx.getRouteParams()
    console.log(email)
    ctx.sendOk()
    // if (!Validator.isPositiveNumber(id)) {
    //   ctx.sendError({
    //     code: Error.codes.ERR_INVALID_ID,
    //     message: Error.messages.ERR_INVALID_ID
    //   })

    //   return
    // }

    // const user = await services.usersService.getUserById(id)

    // const data: IGetUserByIdResponse = {
    //   user
    // }

    // ctx.sendJson(data)
  }
}
