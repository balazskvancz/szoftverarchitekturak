import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import Error from '@common/backend/Error'

import Validator from '@common/Validator/Validator'

import Communicator from '@backend/Communicator/Communicator'

import {
  EBindValue,

  LOGIN_HASH_COOKIE_NAME
} from '../../definitions'

/**
 * Egy olyan middleware amely hozzácsatolja az
 * éppen bejelentkezett felhasználót a kontextushoz.
 * @param ctx   - A kontextus.
 * @param next  - A következő, láncolat beli handler.
 */
export default async function attachUser (
  ctx: IContext,
  next: TCallbackFunction
): Promise<void> {
  const loginHash = ctx.getCookie(LOGIN_HASH_COOKIE_NAME)

  // Ha nincs a sütik között ilyen, akkor eldőlt a sorsa.
  if (!Validator.isNonEmptyString(loginHash)) {
    ctx.sendError({
      code: Error.codes.ERR_USER_NOT_AUTHENTICATED,
      message: Error.messages.ERR_USER_NOT_AUTHENTICATED
    })

    return
  }

  const digestSession = await Communicator.getDigestSession(loginHash)

  // Ha itt null-t kaptunk, akkor valamilyen okból
  // kifolyólag nem valid a munkamenet, újabb hiba.
  if (Validator.isNull(digestSession)) {
    ctx.sendError({
      code: Error.codes.ERR_USER_NOT_AUTHENTICATED,
      message: Error.messages.ERR_USER_NOT_AUTHENTICATED
    })

    return
  }

  const { user } = digestSession

  // Nincs felhasználó csatolva, hiba.
  if (Validator.isNull(user)) {
    ctx.sendError({
      code: Error.codes.ERR_USER_NOT_AUTHENTICATED,
      message: Error.messages.ERR_USER_NOT_AUTHENTICATED
    })

    return
  }

  ctx.bindValue(EBindValue.User, user)

  await next(ctx)
}
