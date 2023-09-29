import Validator from '../Validator'

import type {
  IContext,
  TCallbackFunction,
  TMiddlewareFunction,
  TValidationFunction
} from '../definitions'

/**
 * Visszaadja a becsomagolt validációs függvény egy middleware-ba.
 * @param fn - A validáló függvény.
 */
export default function getValidationMiddleware (fn: TValidationFunction): TMiddlewareFunction {
  return async (ctx: IContext, next: TCallbackFunction): Promise<void> => {
    const error = fn(ctx.getBody())

    if (!Validator.isNull(error)) {
      ctx.sendError(error)

      return
    }

    await next(ctx)
  }
}
