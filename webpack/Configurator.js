require('module-alias/register')

const webpack = require('webpack')

const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const JavaScriptObfuscator      = require('webpack-obfuscator')
const SitemapPlugin             = require('sitemap-webpack-plugin').default

const { makeBypassProxy } = require('@root/webpack/tools/makeBypassProxy')
const { makeProxy }       = require('@root/webpack/tools/makeProxy')

const nodeConfig = require('@root/webpack/webpack.node.config')
// const webConfig  = require('./')

/** @typedef {import('http').ServerResponse} ServerResponse */

/** @typedef {import('./definitions').IEnv} IEnv */
/** @typedef {import('./definitions').IArgv} IArgv */
/** @typedef {import('./definitions').TStats} TStats */
/** @typedef {import('./definitions').TProxy} TProxy */
/** @typedef {import('./definitions').TTarget} TTarget */
/** @typedef {import('./definitions').IParams} IParams */
/** @typedef {import('./definitions').TDevTool} TDevTool */

class WebpackConfigurator {
  /**
   * Példányosít egy webpack configuratort.
   * @url https://webpack.js.org/configuration/configuration-types/#exporting-a-function
   * @param {IEnv} env - A környezeti változók.
   * @param {TAnyObject} argv - Webpack options map.
   * @param {IParams} params - A lehetséges paraméterek.
   */
  constructor (env, argv, params) {
    const { type, ...rest } = params

    const baseConfig = type === 'web' ? /* webConfig */ {} : nodeConfig

    const envWithParams = {
      ...env,
      ...rest,
      tsPaths: [ `${ rest.projectFolder }/*` ]
    }

    console.log(envWithParams.tsPaths)

    this.params = params
    this.config = baseConfig(envWithParams, argv)

    /**
     * @readonly
     * @type {boolean}
     */
    this.isProd = argv.mode === 'production'

    /**
     * Windowsra (EXE) szeretnénk buildelni?
     * @readonly
     * @type {boolean}
     */
    this.isElectronBuild = env && typeof env.electron !== 'undefined'

    /**
     * Androidra (APK) szeretnénk buildelni?
     * @readonly
     * @type {boolean}
     */
    this.isCordovaBuild = env && typeof env.cordova !== undefined

    /**
     * Webre szeretnénk buildelni?
     * @readonly
     * @type {boolean}
     */
    this.isWebBuild = !this.isCordovaBuild && !this.isElectronBuild

    /**
     * Natív appot szeretnénk buildelni, tehát nem online, böngészőben futtatós.
     * Cordova vagy Electron.
     * @readonly
     * @type {boolean}
     */
    this.isNativeBuild = !this.isWebBuild

    /**
     * @readonly
     * @type {'electron' | 'cordova' | 'web'}
     */
    this.buildType = this.isElectronBuild
      ? 'electron'
      : this.isCordovaBuild
        ? 'cordova'
        : 'web'

    this.config.resolve.modules.push(params.projectFolder)
  }

  /**
   * A belépési pontok beállítása.
   * @url https://webpack.js.org/concepts/entry-points/
   * @param {Record<string, string>} entry - A belépési pontokat tartalmazó object.
   */
  setEntry (entry) {
    this.config.entry = entry
  }

  /**
   * Ezzel lehet szabályozni, hogy sourcemap hogyan generálódjon.
   * @url https://webpack.js.org/configuration/devtool/
   * @param {TDevTool} devtool - Az általunk engedett, lehetséges sourcemappok.
   */
  setDevtool (devtool) {
    this.config.devtool = devtool
  }

  /**
   * A kimeneti információkat lehet vele finomhangolni.
   * @url https://webpack.js.org/configuration/stats/
   * @param {TStats} stats - A lehetséges beállítás.
   */
  setStats (stats) {
    this.config.stats = stats
  }

  /**
   * Ezzel lehet szabályozni, hogy az asset fájlokat honnan töltse a wp.
   * @url https://webpack.js.org/configuration/output/#outputpublicpath
   * @param {string} publicPath - A lehetséges path.
   */
  setPublicPath (publicPath) {
    this.config.output.publicPath = publicPath
  }

  /**
   * Megadhatjuk, hogy a bundle milyen névvel legyen létrehozva.
   * A WP engedne függvényt is, de mi lekorlátozzuk stringre.
   * @example
   * bundle.js
   * [name].bundle.js
   * [id].bundle.js
   * [contenthash].bundle.js
   * [name].[contenthash].bundle.js
   * @url https://webpack.js.org/configuration/output/#outputfilename
   * @url https://webpack.js.org/configuration/output/#template-strings
   * @param {string} fileName - A lehetséges bundle elnevezés.
   */
  setOutputFileName (fileName) {
    this.config.output.filename = fileName
  }

  /**
   * Támogatunk electron buildelést, ezért csak azt engedjük.
   * A 'web' és 'node' beállításokat a v1-ben kezeljük, attól függően, hogy milyen 'type' lett megadva.
   * @url https://webpack.js.org/configuration/target/
   * @param {TTarget} target - A lehetséges target.
   */
  setTarget (target) {
    this.config.target = target
  }

  /**
   * Egy új plugin hozzáadása.
   * @url https://webpack.js.org/concepts/plugins/
   * @public
   * @param {unknown} plugin - Az új plugin instance.
   */
  addPlugin (plugin) {
    this.config.plugins.push(plugin)
  }

  /**
   * A Webpack saját, natív DefinePluginját tudjuk felparaméterezni és hozzáadni a WPC-hez.
   * Annyiban jobb, mintha kézzel példányosítanánk, hogy a JSON.stringify problémakört itt magában kezeli.
   * @url https://webpack.js.org/plugins/define-plugin/
   * @param {TAnyObject} param - Valami objectet kell kapjunk.
   */
  addDefinePlugin (param) {
    const definitions = Object.keys(param).reduce((/** @type {TAnyObject} */ acc, curr) => {
      const value = param[curr]

      /** Ezeket az értékeket nem kell stringify-olni. */
      const isNormalValue = (
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        typeof value === 'undefined' ||
        !value
      )

      acc[curr] = isNormalValue
        ? value
        : JSON.stringify(value)

      return acc
    }, {})

    const plugin = new webpack.DefinePlugin(definitions)

    this.addPlugin(plugin)
  }

  /**
   * A Webpack saját, natív ProvidePluginját tudjuk felparaméterezni és hozzáadni a WPC-hez.
   * @url https://webpack.js.org/plugins/provide-plugin/
   * @param {Record<string, string | string[]>} definitions - A lehetséges definíciók.
   */
  addProvidePlugin (definitions) {
    const plugin = new webpack.ProvidePlugin(definitions)

    this.addPlugin(plugin)
  }

  /**
   * Megadható a webpack-nek, hogy hol keresse a hivatkozott assetet.
   * @url https://webpack.js.org/configuration/resolve/#resolvemodules
   * @param {string} module - A module könyvtár.
   */
  addResolveModule (module) {
    this.config.resolve.modules.push(module)
  }

  /**
   * Különböző hivatkozásokat proxizhatunk másfelé.
   * Ez a függvény definíciós objectet fogad.
   * Ha volt már megadva proxy, akkor összemergeli az előzővel.
   * @url https://webpack.js.org/configuration/dev-server/#devserverproxy
   * @param {TProxy} proxy - A lehetséges proxy definíció.
   */
  addProxy (proxy) {
    if (this.isProd) {
      return
    }

    const oldProxy = this.config.devServer.proxy

    this.config.devServer.proxy = typeof oldProxy === 'object'
      ? { ...oldProxy, ...proxy }
      : proxy
  }

  /**
   * A proxy 200, JSON választ ad vissza és zárja a kapcsolatot.
   * @public
   * @param {ServerResponse} res - A szerver válasza.
   * @param {TAnyObject} data - A küldendő adat.
   */
  static proxyReturnsJson (res, data) {
    res.writeHead(200, { 'Content-type': 'application/json' })
    res.write(JSON.stringify(data))
    res.end()
  }

  /** Kidobjuk az optimalizálásból a splitChunks-ot. */
  removeSplitChunks () {
    delete this.config.optimization.splitChunks
  }

  /**
   * Be lehet állítani, hogy milyen könyvtárba menjenek a kép kimenetek.
   * @param {string} outputPath - A kimenet könyvtár.
   */
  setImageOutputPath (outputPath) {
    const foundRule = Object
      .values(this.config.module.rules)
      .find((rule) => (rule.test.test('test.jpg')))

    foundRule.oneOf.forEach((/** @type {any} */ rule) => {
      if (rule.options && typeof rule.options.outputPath === 'string') {
        rule.options.outputPath = outputPath
      }
    })
  }

  /**
   * Az összeállított, lehetséges webpack config.
   * @returns {webpack.Configuration} A config.
   */
  getConfig () {
    return this.config
  }
}

WebpackConfigurator.tools = {
  makeProxy,
  makeBypassProxy,
}

WebpackConfigurator.plugins = {
  // Webpack sajátjai.
  IgnorePlugin: webpack.IgnorePlugin,

  // 3rd party
  WebpackManifestPlugin,
  JavaScriptObfuscator,
  SitemapPlugin,
}

module.exports.WebpackConfigurator = WebpackConfigurator
