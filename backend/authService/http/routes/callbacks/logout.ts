import type { IContext, TCallbackFunction } from '@common/Router/definitions'
import Validator from '@common/Validator/Validator'
import type { ILogoutRequest } from '../../../definitions'
import type { IService } from '../../../getServices'
import Error from '../../../Error'

/**
 * A felhasználó adatainak lekérdezése.
 * @param services - Services.
 */
export default function logout (services: IService): TCallbackFunction {
  return async (ctx: IContext): Promise<void> => {
    const logoutData = ctx.getBody<ILogoutRequest>()

    if (!Validator.isDefined(logoutData)) {
      ctx.sendError({
        code: Error.codes.ERR_MISSING_BODY,
        message: 'Hiányzó request body'
      })

      return
    }

    if (!Validator.isNonEmptyString(logoutData.loginHash)) {
      ctx.sendError({
        code: Error.codes.ERR_WRONG_POSTDATA,
        message: 'Hiányzó session azonosító'
      })

      return
    }

      // lekérjük a hash alapján a rekordot
    const session = await services.sessions.getByHash(logoutData.loginHash)

      // A) nincs ilyen rekord || már le van zárva -> error
    if (Validator.isNull(session)) {
      ctx.sendError({
        code: Error.codes.ERR_INVALID_HASH,
        message: Error.messages.ERR_INVALID_HASH
      })

      return
    }

      // B) van ilyen rekord -> bezárás
    await services.sessions.delete(logoutData.loginHash)

    ctx.sendOk()
  }
}
