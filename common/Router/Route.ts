import type {
  IRoute,
  IContext,
  IRouteParams,
  TCallbackFunction,
  TValidationFunction,
  TMiddlewareFunction
} from './definitions'

import getValidationMiddleware from './utils/getValidationMiddleware'

import matchToType from './utils/parseByType'

export default class Route implements IRoute {
  private readonly route: string
  private readonly callback: TCallbackFunction

  private middlewares: TMiddlewareFunction[] = []

  public constructor (route: string, callback: TCallbackFunction) {
    this.route    = route
    this.callback = callback
  }

  /**
   * Beregisztrál egy adott middleware függvényt egy adott route-hoz.
   * @param middleware - A regisztrálandó middleware.
   */
  public registerMiddleware (middleware: TMiddlewareFunction): this {
    this.middlewares.push(middleware)

    return this
  }

  /**
   * Validációs függvény middlewarré alakítása, majd beszúrása a tömb elejére.
   * @param fn - A validációs függvény.
   */
  public registerValidation (fn: TValidationFunction): IRoute {
    const mw = getValidationMiddleware(fn)
    this.middlewares = [ mw, ...this.middlewares ]

    return this
  }

  /**
   * Illeszti tárolt wildcard paraméterekkel teli URL-t
   * a tényleges URL-re és visszaadja a paramétereket
   * kulcs-érték párokként.
   * @param url - A tényleges bejövő URL.
   */
  public matchParams (url: string): IRouteParams {
    const splittedStoredUrl = this.route.split('/')
    const splittedMatchUrl  = url.split('/')

    // Ekkor valami nagy baj van!
    if (splittedMatchUrl.length !== splittedStoredUrl.length) {
      return {}
    }

    const params: IRouteParams = splittedStoredUrl.reduce((acc, curr, index) => {
      if (!curr.startsWith(':')) {
        return acc
      }

      const key   = curr.slice(1)
      const value = splittedMatchUrl[index]

      acc[key] = matchToType(value)

      return acc
    }, {} as TMutable<IRouteParams>)

    return params
  }

  /** Visszaadja a callbacket ami elé odafűzi az összes regiszrált middlewaret. */
  public getCallback (): TCallbackFunction {
    // Mivel mindig mindig azt szeretnénk, hogy az előző mw a következőt
    // hívja meg (és így tovább egészen a tárolt callback-ig), ezért
    // reverselni kell a tárolt middlewarek listáját és visszafelé megyünk.
    const callback: TCallbackFunction = this.middlewares.reduceRight((acc: TCallbackFunction, curr) => {
      /* eslint-disable no-restricted-syntax */
      /**
       * A következő handlert – vagy middlewart – meghívó closure.
       * @param ctx - A kontextus.
       */
      async function fn (ctx: IContext): Promise<void> {
        await curr(ctx, acc)
      }

      return fn
    }, this.callback)
    /* eslint-enable no-restricted-syntax */

    return callback
  }
}
