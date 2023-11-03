import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import Communicator from '@backend/Communicator/Communicator'

import Error from '@authService/Error'

import type { IService } from '@authService/getServices'

/**
 * A felhasználó szerepkörének lekérdezése adott session alapján.
 * @param services - Services.
 */
export default function getUser (services: IService): TCallbackFunction {
  /**
   * // TODO:
   * sessions táblából lekérjük a hozzá tartozó UserID-t.
   *
   * UserService-től elkérjük az ID alapján az adatokat.
   *
   * Visszatérés a User adatokkal.
   * @param ctx
   */
  return async (ctx: IContext): Promise<void> => {
    const { loginhash } = ctx.getRouteParams()

    if (!Validator.isNonEmptyString(loginhash)) {
      ctx.sendError({
        code: Error.codes.ERR_INVALID_HASH,
        message: Error.messages.ERR_INVALID_HASH
      })

      return
    }

    const session = await services.sessions.getByHash(loginhash)

    if (Validator.isNull(session)) {
      ctx.sendError({
        code: Error.codes.ERR_INVALID_HASH,
        message: Error.messages.ERR_INVALID_HASH
      })

      return
    }

    // van user : megkapom az adatokat
    // [Balázs]: Itt kipótoltam egy await-tel, mivel ez aszinkron művelet.
    const user = await Communicator.getUserById(session.userId)

    // nincs user: torlom a hash
    if (Validator.isNull(user)) {
      await services.sessions.delete(loginhash)

      ctx.sendError({
        code: Error.codes.ERR_NON_EXISTING_USER,
        message: Error.messages.ERR_NON_EXISTING_USER
      })

      return
    }

    // van user -> vissza adom a role-ját // TODO: user.role pontos syntax
    ctx.sendJson({
      role: user.role
    })
  }
}
