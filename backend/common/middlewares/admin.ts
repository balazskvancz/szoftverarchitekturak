import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import Error from '@common/backend/Error'

import { EBindValue } from '../../definitions'
import type { IUser } from '../../definitions'

/**
 * Megvizsgálja, hogy a kontextushoz csatolt felhasználó admin-e.
 * @param ctx   - A kontextus.
 * @param next  - A következő handler.
 */
export default async function admin (
  ctx: IContext,
  next: TCallbackFunction
): Promise<void> {
  const user = ctx.getBindedValue<IUser>(EBindValue.User)

  if (!Validator.isDefined(user)) {
    ctx.sendError({
      code: Error.codes.ERR_NOT_ADMIN,
      message: Error.messages.ERR_NOT_ADMIN
    })

    return
  }

  if (user.role !== 'admin') {
    ctx.sendError({
      code: Error.codes.ERR_NOT_ADMIN,
      message: Error.messages.ERR_NOT_ADMIN
    })

    return
  }

  await next(ctx)
}
