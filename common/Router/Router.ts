/* eslint-disable no-restricted-globals */
import http from 'http'

import type {
  IRoute,
  ILogger,
  IRouter,
  IContext,
  IMiddleware,
  IRouterConfig,
  TCallbackFunction,
  TSuppoprtedHttpMethod
} from './definitions'

import Context    from './Context'
import Logger     from '../Logger/Logger'
import Route      from './Route'
import Tree       from './Tree'
import Validator  from './Validator'

import { METHOD_OPTIONS } from './definitions'

import readPostData from './middlewares/readPostData'

export default class Router implements IRouter {
  // eslint-disable-next-line no-use-before-define
  private static instance: Router

  private readonly methodTrees: Map<TSuppoprtedHttpMethod, Tree>
  private readonly config: IRouterConfig

  private readonly globalMiddlewares: IMiddleware[]

  private readonly logger: ILogger

  private constructor (config: IRouterConfig) {
    this.methodTrees  = new Map<TSuppoprtedHttpMethod, Tree>()
    this.config       = config

    this.globalMiddlewares = [ readPostData ]
    this.logger = new Logger('HTTP-ROUTER')
  }

  /**
   * Publikus, statikus példányosító vagy létező példányra getter.
   * @param config - A router egyed konfigja.
   */
  public static getInstance (config: IRouterConfig): IRouter {
    if (!Router.instance) {
      this.instance = new this(config)
    }

    return this.instance
  }

  /**
   * Get típusú metódus regisztrálása.
   * @param url - Az URL.
   * @param cb  - A végpont.
   */
  public get (url: string, cb: TCallbackFunction): IRoute {
    return this.addRoute('get', url, cb)
  }

  /**
   * Post típusú metódus regisztrálása.
   * @param url - Az URL.
   * @param cb  - A végpont.
   */
  public post (url: string, cb: TCallbackFunction): IRoute {
    return this.addRoute('post', url, cb)
  }

  /**
   * Put típusú metódus regisztrálása.
   * @param url - Az URL.
   * @param cb  - A végpont.
   */
  public put (url: string, cb: TCallbackFunction): IRoute {
    return this.addRoute('put', url, cb)
  }

  /**
   * Delete típusú metódus regisztrálása.
   * @param url - Az URL.
   * @param cb  - A végpont.
   */
  public delete (url: string, cb: TCallbackFunction): IRoute {
    return this.addRoute('delete', url, cb)
  }

  /**
   * Head típusú metódus regisztrálása.
   * @param url - Az URL.
   * @param cb  - A végpont.
   */
  public head (url: string, cb: TCallbackFunction): IRoute {
    return this.addRoute('head', url, cb)
  }

  /** Elindítja a hallgatózást a megadott porton. */
  public listen (): void {
    const { address } = this.config

    this.logger.info(`started at port: ${ address }`)

    http.createServer(async (req, res) => {
      await this.run(req, res)
    }).listen(address, 'localhost')
  }

  /**
   * Megfuttat egy kérést.
   * @param req   - A bejöv natív kérés.
   * @param res   - A szerver válasza.
   */
  public async run (req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
    const ctx = new Context(req, res, this.logger)

    // Itt elkérjük az összes olyan globális middlewaret, amely ileszkedik
    // az újonnan létrehozott kontextusra.
    const matchingMiddlewares = this.getMatchingMiddleware(ctx)

    const handler = this.getHandler(ctx)

    // PLS dont hate me!
    /* eslint-disable no-restricted-syntax */
    /**
     * A talált handler becsomagolva egy másik handlerbe, amelyen
     * után biztosan meghívódik a válaszba való írás.
     * @param c - A kontextus.
     */
    async function wrappedHandler (c: IContext): Promise<void> {
      await handler(c)
      ctx.writeToResponse()
    }

    const attachedCallback = matchingMiddlewares.reduceRight((acc, curr) => {
      /**
       * Egy adott middleware vétrehajtása.
       * @param innerCtx - Az éppen akkori kontextus.
       */
      async function fn (innerCtx: IContext): Promise<void> {
        await curr.execute(innerCtx, acc)
      }

      return fn
    }, wrappedHandler)
    /* eslint-enable no-restricted-syntax */

    await attachedCallback(ctx)

    const { hasLogger } = this.config

    if (Validator.isBoolean(hasLogger) && !hasLogger) {
      return
    }

    const logText = `[${ ctx.getMethod()?.toUpperCase() }] ${ ctx.getUrl() } ${ ctx.getWrittenStatusCode() }`
    ctx.info(logText)
  }

  /**
   * Beregisztrálja a megoadtt globális middlewareket.
   * @param middlewares - Middlewarek.
   */
  public registerMiddleware (...middlewares: IMiddleware[]): void {
    this.globalMiddlewares.push(...middlewares)
  }

  /**
   * Visszaadja a végrehajtandó handlert.
   * @param ctx - A kontextus.
   */
  private getHandler (ctx: IContext): TCallbackFunction {
    const method = ctx.getMethod()

    /* eslint-disable no-restricted-syntax */
    /**
     * Egy 404-es handler becsomagolva egy másik, kívűlről hívható handlerbe.
     * @param c - Az akkori kontextus.
     */
    async function notFound (c: IContext): Promise<void> {
      await Promise.resolve()
      c.sendNotFound()
    }
    /* eslint-enable no-restricted-syntax */

    // Options metódus esetén tovább nem kell keresni,
    // minden esetben egy egyszerű HTTP 200-al térünk vissza.
    // Fontos, hogy minden esetben a programozó dolga
    // hogy gondoskodjon a saját CORS middleware alkalmazásáról.
    if (method === METHOD_OPTIONS) {
      return async (c: IContext): Promise<void> => {
        await Promise.resolve()
        c.sendOk()
      }
    }

    if (!Validator.isSupportedMethod(method)) {
      return notFound
    }

    const tree = this.methodTrees.get(method)

    if (!Validator.isNonEmptyObject(tree)) {
      return notFound
    }

    const route = tree.find(ctx.getCleanedUrl())

    if (!Validator.isNonEmptyObject(route)) {
      return notFound
    }

    const routeEndpoint = route.getValue()

    if (!Validator.isNonEmptyObject(routeEndpoint)) {
      return notFound
    }

    // Hozzácsatoljuk a kontextushoz az URL-ben szereplő paramétereket.
    ctx.setRouteParams(routeEndpoint.matchParams(ctx.getUrl()))

    // Végül pedig visszaadjuk a talált végpont callbackjét.
    return routeEndpoint.getCallback()
  }

  /**
   * Ténylegesen beregisztrál egy végpontot a fába.
   * @param method  - A metódus.
   * @param url     - Az URL.
   * @param cb      - A callback.
   */
  private addRoute (method: TSuppoprtedHttpMethod, url: string, cb: TCallbackFunction): IRoute {
    const route = new Route(url, cb)

    const methodTree = this.getOrCreateMethodTree(method)

    methodTree.insert(url, route)

    return route
  }

  /**
   * Elkér vagy létrehoz egy új fát az adott metódus alapján.
   * @param method - A metódus.
   */
  private getOrCreateMethodTree (method: TSuppoprtedHttpMethod): Tree {
    const methodTree = this.methodTrees.get(method)

    if (Validator.isDefined(methodTree)) {
      return methodTree
    }

    const newTree = new Tree()

    this.methodTrees.set(method, newTree)

    return newTree
  }

  /**
   * Visszaadja az összes egy adott kontextusra illeszkedő middlewaret.
   * @param ctx - A kontextus.
   */
  private getMatchingMiddleware (ctx: IContext): IMiddleware[] {
    const matchingMiddlewares = this.globalMiddlewares.filter((el) => el.doesMatch(ctx))

    return matchingMiddlewares
  }
}
