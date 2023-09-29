import type {
  IContext,
  IMiddleware,
  TMatcherFunction,
  TCallbackFunction,
  TMiddlewareFunction
} from './definitions'

import Validator from './Validator'

export default class Middleware implements IMiddleware {
  private readonly mw: TMiddlewareFunction
  private readonly matcher: TMatcherFunction

  public constructor (mw: TMiddlewareFunction, matcher?: TMatcherFunction) {
    this.mw = mw

    // Ha van megadva egyéni matcher, akkor azt vesszük figyelembe,
    // ellenkező esetben pedig a default „mindenre is” egyező matcher kell.
    this.matcher = Validator.isDefined(matcher)
      ? matcher
      : (_: IContext) => true
  }

  /**
   * Megmondja, hogy egy MW.
   * @param ctx - Az adott kontextus.
   */
  public doesMatch (ctx: IContext): boolean {
    return this.matcher(ctx)
  }

  /**
   * Végrehajta a példányhoz csaolt middlewaret.
   * @param ctx   - A kontextus.
   * @param next  - A következő mw.
   */
  public async execute (ctx: IContext, next: TCallbackFunction): Promise<void> {
    await this.mw(ctx, next)
  }
}
