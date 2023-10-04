import Validator from '@common/Router/Validator'

import { METHODS_WITH_POST_BODY } from '@common/Router/definitions'
import type { IContext } from '@common/Router/definitions'

/**
 * Matcher, azaz mikor hívódjon meg a middleware.
 * @param ctx - A kontextus.
 */
export default function matcher (ctx: IContext): boolean {
  const method = ctx.getMethod()

  // Ha valamiért nem lenne metódus, akkor next.
  if (!Validator.isDefined(method)) {
    return false
  }

  // Ha body nélküli metódus lenne, akkor next.
  if (!Validator.isOneOf(method, ...METHODS_WITH_POST_BODY)) {
    return false
  }

  return true
}
