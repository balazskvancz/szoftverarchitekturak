import type { IContext, TCallbackFunction } from '@common/Router/definitions'

import Validator from '@common/Validator/Validator'

import Error from '@common/backend/Error'

import { EBindValue } from '../../definitions'
import type { IUser } from '../../definitions'

/**
 * Megvizsgálja, hogy a kontextushoz csatolt felhasználó sima felhasználó-e.
 * @param ctx   - A kontextus.
 * @param next  - A következő handler.
 */
export default async function customer (
  ctx: IContext,
  next: TCallbackFunction
): Promise<void> {
  const user = ctx.getBindedValue<IUser>(EBindValue.User)

  if (!Validator.isDefined(user)) {
    ctx.sendError({
      code: Error.codes.ERR_NOT_CUSTOMER,
      message: Error.messages.ERR_NOT_CUSTOMER
    })

    return
  }

  if (user.role !== 'customer') {
    ctx.sendError({
      code: Error.codes.ERR_NOT_CUSTOMER,
      message: Error.messages.ERR_NOT_CUSTOMER
    })

    return
  }

  await next(ctx)
}
