import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import type { IService } from '../../../getServices'
import Validator from '@common/Validator/Validator'
import Error from '../../../Error'
import Communicator from '@root/backend/Communicator/Communicator'


/**
 * A felhasználó adatainak lekérdezése adott session alapján.
 * @param services - Services.
 */
export default function getUser (services: IService): TCallbackFunction {
   return async (ctx: IContext): Promise<void> => {
      const loginhash = ctx.getRouteParams()

      if (!Validator.isNonEmptyString(loginhash )) {
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

      console.log(session.userId)
      // van user : megkapom az adatokat
      const user = Communicator.getUserById(session.userId)

      // nincs user: torlom a hash
      if (Validator.isNull(user)) {
        await services.sessions.delete(loginhash)
        ctx.sendError({
          code: Error.codes.ERR_NON_EXISTING_USER,
          message: Error.messages.ERR_NON_EXISTING_USER
        })

        return
      }

      // van user -> vissza adom
      ctx.sendJson({
        user
      })
    }
}
